import {LastModifiedDetails} from '../common/last-modified-details';
import {Group} from '../group/group';
import {appLogger} from '../../app-logger';

export class Service
{
  _id: string;
  name: string;
  type: ServiceType;
  basePath: string;
  group: Group;
  owner?: string;
  lastModified?: LastModifiedDetails;


// ~~-~~-~~-~~-~~ Constructors ~~-~~-~~-~~-~~

  /**
   * Maps known keys from input data to properties of a new Service instance.
   *
   * @param data containing properties of a Service
   */
  constructor(data: any)
  {
    appLogger().trace('constructing new Service from data');

    // TODO: make sure any defaults are created as needed.
    //     constructor();
    //     constructor(obj: IBox);
    //     constructor(obj?: any) {
    //         this.x = obj && obj.x || 0
    //         this.y = obj && obj.y || 0
    //         this.height = obj && obj.height || 0
    //         this.width = obj && obj.width || 0;
    //     }

    Object.keys(data).forEach(key => {
      switch (key)
      {
        case '_id':
          this._id = data._id;
          break;

        case 'name':
          this.name = data[key];
          break;

        case 'group':
          this.group = data[key];
          break;

        case 'owner':
          this.owner = data[key];
          break;

        case 'type':
          this.type = data.type;
          break;

        case 'basePath':
          this.basePath = data.basePath;
          break;

        case 'lastModified':
          this.lastModified = data.lastModified;
          break;

        default:
          appLogger().warn(`ignoring unknown property: ${key}`);
      }
    });
  }
}


export enum ServiceType {SOAP, REST, MQ}
