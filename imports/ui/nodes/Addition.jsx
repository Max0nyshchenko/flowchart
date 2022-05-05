import React from "react";
import { Typography, TextField, Box, Button, Paper } from "@mui/material";
import { useNode } from "../SchemaProvider.jsx";

export const AdditionNode = ({ data, inputs, outputs, id }) => {
  const { changeData, deleteNode } = useNode(id);
  return (
    <Paper elevation={4}>
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
      <Typography>Sum: {data.sum}</Typography>
    </Paper>
  );
};
