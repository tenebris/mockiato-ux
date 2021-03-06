import {environment} from '../../../../../environments/environment';


interface SenderConfig
{
  target: string;
  timeout_ms: number;
}


export const SENDER_CONFIG: SenderConfig = {
  target: environment.coreBaseUrl + '/api',
  timeout_ms: 5000
};
