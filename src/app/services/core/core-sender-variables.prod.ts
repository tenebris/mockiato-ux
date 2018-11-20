interface SenderConfig {
  target: string;
  timeout_ms: number;
}

// noinspection JSUnusedGlobalSymbols
export const SENDER_CONFIG: SenderConfig = {
  target: 'http://tenebris-mockiato.ngrok.io/api',
  timeout_ms: 5000
};
