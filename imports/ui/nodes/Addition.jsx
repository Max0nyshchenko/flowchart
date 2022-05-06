import React from "react";
import { Typography, TextField, Box, Button, Paper } from "@mui/material";
import { useNode } from "../SchemaProvider.jsx";

export const AdditionNode = ({ data, inputs, outputs, id }) => {
  const { changeData, deleteNode } = useNode(id, "addition");
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
      <Typography>Sum: {data.sum}</Typography>
    </Paper>
  );
};
