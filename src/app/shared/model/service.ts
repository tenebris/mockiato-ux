import {appLogger} from '../app-logger';


export class Service
{
  constructor(data: any)
  {
    Object.keys(data).forEach(key => {
      switch (key)
      {
        case '_id':
          this._id = data._id;
          break;

        case 'name':
          this.name = data.name;
          break;

        case 'type':
          this.type = data.type;
          break;

        case 'lastModified':
          this.lastModified = data.lastModified;
          break;

        default:
          appLogger().warn(`found unmapped key[${key}] while building service -- ignoring`);
      }
    });
  }

  _id: string;
  name: string;
  type: ServiceType;
  owner?: string;
  lastModified?: {
    timestamp: Date;
    user: string;
  };
}

export enum ServiceType {SOAP, REST, MQ}
