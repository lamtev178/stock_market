import { Paper } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import Home from "./pages/Home/Home";

function App() {
  return (
    <Box width="90%" margin="10px auto">
      <Paper sx={{ padding: 5 }}>
        <Home />
      </Paper>
    </Box>
  );
}

export default App;
