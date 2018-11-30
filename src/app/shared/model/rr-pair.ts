import {HttpHeaders} from '@angular/common/http';


export class RequestData
{
  name: string;
}


export class ResponseData
{
  success: boolean;
}


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
