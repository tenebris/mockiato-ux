export class Service
{
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
