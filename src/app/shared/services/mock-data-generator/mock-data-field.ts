export enum MockDataFieldType
{
  root, group, field
}


export interface MockDataFieldDefinition
{
  name: string;
  type: MockDataFieldType;
  value: any;
}
