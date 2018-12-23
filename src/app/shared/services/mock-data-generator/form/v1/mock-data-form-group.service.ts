import {Injectable} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MockDataFieldType} from '../../mock-data-field';
import {MockElementField} from './mock-element-field';


@Injectable({providedIn: 'root'})
export class MockDataFormGroupService
{

// ~~-~~-~~-~~-~~ Constructors ~~-~~-~~-~~-~~
  constructor() { }


  private static toFormControl(name: string, type: MockDataFieldType)
  {
    const item = new MockElementField({value: {name: name, type: type}});
    return {[item.key]: new FormControl(item)};
  }


  // TODO: uncomment when ready to generate form-group lazily
  // generateFormGroup(structure: any): FormGroup
  // {
  //   const elements: any = {};
  //
  //
  //   Object.keys(structure).forEach(key => {
  //     const item = structure[key];
  //     appLogger().debug(`found key: ${key}/${JSON.stringify(item)}`);
  //
  //     elements[key] = MockDataFormGroupService.toFormControl(structure[key], MockDataFieldType.address);
  //   });
  //
  //   return new FormGroup(elements);
  // }
}
