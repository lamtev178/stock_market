import { ClientMessage } from "./Models/ClientMessages";
import {
  ClientMessageType,
  Instrument,
  OrderSide,
  ServerMessageType,
} from "./Enums";
import Decimal from "decimal.js";
import { ServerEnvelope } from "./Models/ServerMessages";

export default class WSConnector {
  connection: WebSocket | undefined;
  connection_id: string;

  constructor() {
    this.connection = undefined;
    this.connection_id = "";
  }

  connect = () => {
    this.connection = new WebSocket("ws://127.0.0.1:8000/ws/");

    this.connection.onclose = () => {
      this.unsubscribeMarketData(this.connection_id);
      this.connection_id = "";
      this.connection = undefined;
    };

    this.connection.onerror = () => {
      this.unsubscribeMarketData(this.connection_id);
      console.log("ERROR");
    };

    this.connection.onopen = () => {
      this.subscribeMarketData(Instrument.eur_rub);
    };

    this.connection.onmessage = (event) => {
      const message: ServerEnvelope = JSON.parse(event.data);
      switch (message.message_type) {
        case ServerMessageType.success: {
          this.connection_id = message.message.subscription_id;
          break;
        }
        case ServerMessageType.error: {
          console.log(message.message);
          break;
        }
        case ServerMessageType.executionReport: {
          console.log(message.message);
          break;
        }
        case ServerMessageType.marketDataUpdate: {
          console.log(message.message);
          break;
        }
      }
    };
  };

  disconnect = () => {
    this.connection?.close();
  };

  send = (message: ClientMessage) => {
    this.connection?.send(JSON.stringify(message));
  };

  subscribeMarketData = (instrument: Instrument) => {
    this.send({
      messageType: ClientMessageType.subscribeMarketData,
      message: {
        instrument,
      },
    });
  };

  unsubscribeMarketData = (subscription_id: string) => {
    this.send({
      messageType: ClientMessageType.unsubscribeMarketData,
      message: {
        subscription_id,
      },
    });
  };

  placeOrder = (
    instrument: Instrument,
    side: OrderSide,
    amount: Decimal,
    price: Decimal
  ) => {
    this.send({
      messageType: ClientMessageType.placeOrder,
      message: {
        instrument,
        side,
        amount,
        price,
      },
    });
  };
}
