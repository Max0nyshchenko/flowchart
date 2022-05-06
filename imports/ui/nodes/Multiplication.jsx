import React from "react";
import { Box, Paper, Typography } from "@mui/material";

export const MultiplicationNode = ({ data, inputs, outputs }) => {
  return (
    <Paper>
      <Box sx={{ border: "1px solid red" }}>
        {inputs.map((port) =>
          React.cloneElement(port, {
            style: { width: "25px", height: "25px", background: "#1B263B" },
          })
        )}
        {outputs.map((port) =>
          React.cloneElement(port, {
            style: { width: "25px", height: "25px", background: "#1B263B" },
          })
        )}
      </Box>
      <Typography>Product: {data.product}</Typography>
    </Paper>
  );
};
