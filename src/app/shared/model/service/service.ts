export class Service
{
  /**
   * Maps known keys from input data to properties of a new Service instance.
   *
   * @param data containing properties of a Service
   */
  constructor(data: any)
  {
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
