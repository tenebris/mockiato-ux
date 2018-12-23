import {MockDataFieldDefinition, MockDataFieldType} from './mock-data-field';
import {appLogger} from '../../app-logger';
import {PersonAge} from './mock-data-generator.service';
import {DatePipe} from '@angular/common';


export class MockDataStructure implements FlatMockDataStructure, MockDataFieldDefinition
{


  readonly name: string;
  readonly type: MockDataFieldType;
  readonly value: MockDataFieldDefinition[] = [];

  private readonly parent: MockDataStructure;
  private datePipe: DatePipe;


// ~~-~~-~~-~~-~~ Constructors ~~-~~-~~-~~-~~

  private constructor(name?: string, type?: MockDataFieldType, parent?: MockDataStructure)
  {
    this.type = type ? type : MockDataFieldType.root;
    if (parent && this.type === MockDataFieldType.root) throw new Error('there can only be one root');

    this.name = name;
    this.parent = parent;
  }


  /** factory method to create a new mock-data structure */
  public static newMockDataStructure(name?: string): MockDataStructure
  { return new MockDataStructure(name ? name : 'root'); }


  // TODO: uncomment this when hierarchical structure is supported
  // public addFieldGroup(name: string): MockDataStructure
  // {
  //   const group = new MockDataStructure(name, MockDataFieldType.group, this);
  //   this.fields.push(group);
  //   return group;
  // }
  //

  public addField(name: string, type: string)
  { this.value.push({name: name, value: type, type: MockDataFieldType.field}); }


  generate(impl: any, context?: GenerationContext): object
  {
    if (!context) return this.generate(impl, {key: 'root', definitions: this.value, object: {}});

    appLogger().debug(`processing context: ${context.key}\n
definitions:\n${JSON.stringify(context.definitions, undefined, 4)}
object:\n${JSON.stringify(context.object, undefined, 4)}`);

    // need this outside loop in order to keep a
    // person's age and birthday self-consistent
    let age: PersonAge;

    for (let i = 0; i < context.definitions.length; i++)
    {
      const definition = context.definitions[i];
      appLogger().debug(`processing definition:\n${JSON.stringify(definition, undefined, 4)}`);

      const f = impl[definition.value];
      if (!f)
      {
        appLogger().error(`ignoring unsupported generator method: ${definition.value}`);
        continue;
      }

      switch (definition.type)
      {
        case MockDataFieldType.field:
          const fieldType = definition.value;

          switch (fieldType)
          {
            case 'birthday':
              if (!age) age = impl['_age']();
              context.object[definition.name] = this.isoDateString(age.birthday);
              break;

            case 'age':
              if (!age) age = impl['_age']();
              context.object[definition.name] = age.years;
              break;

            default:
              context.object[definition.name] = impl[fieldType]();
          }
          break;

        default:
          appLogger().error(`ignoring unsupported type: ${MockDataFieldType[definition.type]}`);
      }
    }

    // return the object constructed by this iteration...
    return context.object;
  }


  private isoDateString(date: Date): string
  {
    if (!this.datePipe) this.datePipe = new DatePipe('en-US');
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }
}


interface GenerationContext
{
  key: string;
  definitions: MockDataFieldDefinition[];
  object: object;
}


/** simple flat data-structure for mock data */
interface FlatMockDataStructure
{
  value: MockDataFieldDefinition[];
}
