import React, { useState } from "react";
import { Typography, TextField, Box, Button, Paper } from "@mui/material";
import { useNode } from "../SchemaProvider.jsx";

export const InputNode = ({ outputs, data, inputs, id }) => {
  const { changeData, deleteNode } = useNode(id, "input");
  const [number, setNumber] = useState(0);
  return (
    <Paper elevation={4}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          {inputs.map((port) =>
            React.cloneElement(port, {
              style: { width: "25px", height: "25px", background: "#1B263B" },
            })
          )}
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          {outputs.map((port) =>
            React.cloneElement(port, {
              style: { width: "25px", height: "25px", background: "#1B263B" },
            })
          )}
        </Box>
      </Box>
      <Typography>{data.number}</Typography>
      <TextField
        value={number}
        onChange={(e) => {
          const value = +e.target.value;
          if (typeof value === "number" && !Number.isNaN(value)) {
            changeData({ number: value });
            setNumber(value);
          }
        }}
      />
    </Paper>
  );
};
