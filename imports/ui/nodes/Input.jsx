import React from "react";
import { Typography, TextField, Box, Button, Paper } from "@mui/material";
import { useNode } from "../SchemaProvider.jsx";

export const InputNode = ({ outputs, data, inputs, id }) => {
  const { changeData, deleteNode } = useNode(id);
  return (
    <Paper elevation={4}>
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
      <Typography>{data.number}</Typography>
      <TextField
        defaultValue={0}
        onChange={(e) => changeData({ number: e.target.value })}
      />
    </Paper>
  );
};
