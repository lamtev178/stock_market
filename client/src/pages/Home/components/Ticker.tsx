import {
  Box,
  Button,
  Card,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import React from "react";
import { Instrument } from "../../../Enums";

export default function Ticker({
  instrument,
  changeInstrument,
}: {
  instrument: Instrument;
  changeInstrument: (e: Instrument) => void;
}) {
  const { buy, sell }: { buy: number; sell: number } = { buy: 10, sell: 10 };
  return (
    <Box>
      <Card sx={{ padding: 3 }}>
        <Grid container spacing={3}>
          <Grid item md={12}>
            <FormControl fullWidth>
              <InputLabel>Select Instrument</InputLabel>
              <Select
                size="small"
                value={instrument}
                onChange={(e) => changeInstrument(e.target.value as Instrument)}
                label="Select Instrument"
              >
                {Object.values(Instrument).map((e) => (
                  <MenuItem key={e} value={e}>
                    {e}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item md={6} sx={{ textAlign: "center", color: "#c62828" }}>
            <Typography variant="subtitle2">{sell}</Typography>
            <Button variant="contained" color="error">
              SELL
            </Button>
          </Grid>
          <Grid item md={6} sx={{ textAlign: "center", color: "#2e7d32" }}>
            <Typography variant="subtitle2">{buy}</Typography>
            <Button variant="contained" color="success">
              BUY
            </Button>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
}
