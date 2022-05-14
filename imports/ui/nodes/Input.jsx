import React, { useState } from "react";
import { IconButton, TextField, Paper } from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { useNode } from "../context/SchemaProvider";
import { InputsOutputs } from "./InputsOutputs";

export const InputNode = ({ outputs, inputs, id }) => {
  const { changeData, deleteNode } = useNode(id);
  const [number, setNumber] = useState(0);

  return (
    <Paper elevation={4} sx={{ pt: 3 }}>
      <IconButton
        size="small"
        sx={{ position: "absolute", right: -5, top: -5 }}
        onClick={deleteNode}
      >
        <CloseIcon />
      </IconButton>
      <InputsOutputs {...{ outputs, inputs, text: "Number goes here" }} />
      <TextField
        fullWidth
        value={number}
        onChange={(e) => {
          const value = +e.target.value;
          if (typeof value === "number" && !Number.isNaN(value)) {
            changeData({ input: value });
            setNumber(value);
          }
        }}
      />
    </Paper>
  );
};
