import {MockElementBase} from './mock-element-base';


export interface MockElementGroup
{
  name: string;
}


export class MockElementGroupField extends MockElementBase<MockElementGroup> {}
