import {LastModifiedDetails} from '../common/last-modified-details';

export interface Group
{
  _id?: string;
  name: string;
  owner?: string;
  lastModified?: LastModifiedDetails;
}
