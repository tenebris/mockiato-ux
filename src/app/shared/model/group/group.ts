import {LastModifiedDetail} from '../common/last-modified-detail';

export interface Group
{
  _id?: string;
  name: string;
  owner?: string;
  lastModified?: LastModifiedDetail;
}
