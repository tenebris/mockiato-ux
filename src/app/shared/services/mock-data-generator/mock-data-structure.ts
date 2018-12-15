import {MockDataFieldDefinition, MockDataFieldType} from './mock-data-field';


export class MockDataStructure implements FlatMockDataStructure, MockDataFieldDefinition
{


  readonly name: string;
  readonly type: MockDataFieldType;
  readonly fields: MockDataFieldDefinition[];

  private readonly parent: MockDataStructure;


// ~~-~~-~~-~~-~~ Constructors ~~-~~-~~-~~-~~

  private constructor(name?: string, type?: MockDataFieldType, parent?: MockDataStructure)
  {
    this.type = type ? type : MockDataFieldType.root;
    if (parent && this.type === MockDataFieldType.root) throw new Error('there can only be one root');

    this.name = name;
    this.parent = parent;
  }


  /** factory method to create a new mock-data structure */
  public static newMockDataStructure(): MockDataStructure { return new MockDataStructure(); }


  addFieldGroup(name: string): MockDataStructure
  {
    const group = new MockDataStructure(name, MockDataFieldType.group, this);
    this.fields.push(group);
    return group;
  }
}


/** simple flat data-structure for mock data */
interface FlatMockDataStructure
{
  fields: MockDataFieldDefinition[];
}
