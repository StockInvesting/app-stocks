export interface BotSettings {
  botName: string;
  description: string;
  apiKey: string;
  apiSecret: string;
  timeframeUnit: string;
  multipleEntries: boolean;
  swingTrade: boolean;
  botStartCondition: string;
  settingsFormat: string;
  orderType: string;
  amountType: string;
  leverage: string;
  percentage: string;
}

export interface AlertData {
  webhookUrl: string;
  alertMessage: string;
  enterLong: string;
  enterShort: string;
  exitAll: string;
}

export interface Exits {
  takeProfit: boolean;
  stopLoss: boolean;
  moveStopLoss: boolean;
  trailingStop: boolean;
  reduceOnly: boolean;
  dca: boolean;
}
