import {HttpHeaders} from '@angular/common/http';


export class RequestData
{
  name: string;
}


export class ResponseData
{
  success: boolean;
}


// TODO: make abstract -- should always be a sub-class of rr-pair
// TODO: move anything that is not generic to thier sub-types
export class RRPair
{
  _id: string;
  path: string;
  verb: string;

  payloadType: MimeType;

  requestData: RequestData;
  requestHeaders: HttpHeaders[];

  responseStatus: number;
  responseData: ResponseData;
  responseHeaders: HttpHeaders[];

}


export class SoapRRPair extends RRPair
{
  // TODO: add distinguishing/unique data
}


export class RestRRPair extends RRPair
{
  // TODO: add distinguishing/unique data
}

export class MqRRPair extends RRPair
{
  // TODO: add distinguishing/unique data
}
