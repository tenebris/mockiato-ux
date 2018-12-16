export enum MockDataFieldType
{
  root, group, address
}


export interface MockDataFieldDefinition
{
  name: string;
  type: MockDataFieldType;
}
