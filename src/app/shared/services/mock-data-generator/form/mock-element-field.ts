import {MockElementBase} from './mock-element-base';
import {MockDataFieldType} from '../mock-data-field';


export interface MockElement
{
  name: string;
  type: MockDataFieldType;
}


export class MockElementField extends MockElementBase<MockElement>
{
}
