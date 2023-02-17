import {
  Paper,
  Box,
  TableHead,
  TableRow,
  TableCell,
  Table,
  TableBody,
  Typography,
} from "@mui/material";
import React from "react";

export default function OrderList() {
  const list = [
    {
      id: 1,
      creation_time: new Date(),
      change_time: new Date(),
      status: "Active",
      side: "Buy",
      price: 10,
      amount: 10000,
      instrument: "eur_usd",
    },
  ];
  return (
    <Box>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              {Object.keys(list[0]).map((key) => (
                <TableCell key={key}>
                  <Typography variant="subtitle2" fontWeight={700}>
                    {key}
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              {list.map((el) => (
                <TableCell key={el.id}>{el.status}</TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
}
