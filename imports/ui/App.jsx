import React from "react";
import { Box, Typography } from "@mui/material";
import { Flowchart } from "./Flowchart.jsx";

export const App = () => (
  <Box sx={{ p: 3 }}>
    <Typography>Hello Flowchart</Typography>
    <Flowchart />
  </Box>
);
