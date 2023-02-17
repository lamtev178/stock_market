export enum ClientMessageType {
  subscribeMarketData = 1,
  unsubscribeMarketData,
  placeOrder,
}

export enum ServerMessageType {
  success = 1,
  error,
  executionReport,
  marketDataUpdate,
}

export enum OrderSide {
  BUY = "buy",
  SELL = "sell",
}

export enum OrderStatus {
  ACTIVE = "active",
  FILLED = "filled ",
  REJECTED = "rejected",
  CANCELLED = "cancelled",
}

export enum Instrument {
  eur_usd = "EUR/USD",
  eur_rub = "EUR/RUB",
  usd_rub = "USD/RUB",
}
