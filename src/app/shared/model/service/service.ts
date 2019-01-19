import {LastModifiedDetail} from '../common/last-modified-detail';
import {Group} from '../group/group';
import {MockiatoUser} from '../mockiato-user';
import {RRPair} from '../rr-pair';


export class Service
{
  _id: string;
  name: string;
  type: ServiceType;
  basePath: string;
  running?: boolean;
  rrpairs?: RRPair[];
  group: Group;
  owner?: MockiatoUser;
  lastModified?: LastModifiedDetail;
}


export enum ServiceType {SOAP, REST, MQ}
