interface SenderConfig {
  target: string;
  timeout_ms: number;
}

export const SENDER_CONFIG: SenderConfig = {
  target: 'https://tenebris-mockiato.ngrok.io/api',
  timeout_ms: 5000
};
