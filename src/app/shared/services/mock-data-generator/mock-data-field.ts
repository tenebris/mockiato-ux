export enum MockDataFieldType
{
  root, group
}


export interface MockDataFieldDefinition
{
  name: string;
  type: MockDataFieldType;
}
