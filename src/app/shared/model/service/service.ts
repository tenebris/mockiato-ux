import {LastModifiedDetails} from '../common/last-modified-details';
import {Group} from '../group/group';


export class Service
{
  _id: string;
  name: string;
  type: ServiceType;
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
    console.log('constructing new Service from data');

    // TODO: this(); // make sure any defaults are created as needed.

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
          console.log(`ignoring unknown property: ${key}`);
      }
    });
  }
}


export enum ServiceType {SOAP, REST, MQ}
