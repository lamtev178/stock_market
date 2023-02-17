import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Instrument } from "../../Enums";
import WSConnector from "../../WSClient";
import OrderList from "./components/OrderList";
import Ticker from "./components/Ticker";

export default function Home() {
  const [instrument, setInstrument] = useState<Instrument>(Instrument.eur_rub);
  const ws = new WSConnector();
  useEffect(() => {
    ws.connect();
    return () => ws.disconnect();
  }, []);

  function changeInstrument(e: Instrument) {
    ws.unsubscribeMarketData(ws.connection_id);
    setInstrument(e);
    ws.subscribeMarketData(instrument);
  }

  return (
    <Box display="flex" justifyContent="space-between" sx={{ columnGap: 3 }}>
      <Ticker instrument={instrument} changeInstrument={changeInstrument} />
      <OrderList />
    </Box>
  );
}
