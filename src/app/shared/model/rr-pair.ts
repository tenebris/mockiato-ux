export class RequestData
{
  payload: any;
}


export class ResponseData
{
  payload: any;
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
  requestHeaders: HttpHeader[];

  responseStatus: number;
  responseData: ResponseData;
  responseHeaders: HttpHeader[];

}


export class HttpHeader
{
  name: string;
  value: string;
}


// noinspection JSUnusedGlobalSymbols
export class SoapRRPair extends RRPair
{
  // TODO: add distinguishing/unique data
}


// noinspection JSUnusedGlobalSymbols
export class RestRRPair extends RRPair
{
  // TODO: add distinguishing/unique data
}


// noinspection JSUnusedGlobalSymbols
export class MqRRPair extends RRPair
{
  // TODO: add distinguishing/unique data
}
