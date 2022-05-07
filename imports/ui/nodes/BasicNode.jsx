import React from "react";
import { IconButton, Paper, Typography } from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { InputsOutputs } from "./InputsOutputs";
import { useNode } from "../context/SchemaProvider";

export const BasicNode = ({ inputs, outputs, text, id, result }) => {
  const { deleteNode } = useNode(id);

  return (
    <Paper elevation={4} sx={{ overflow: "hidden", pt: 3 }}>
      <IconButton
        size="small"
        sx={{ position: "absolute", right: -5, top: -5 }}
        onClick={deleteNode}
      >
        <CloseIcon />
      </IconButton>
      <InputsOutputs {...{ inputs, outputs, text }} />
      <Typography variant="body2" align="center">
        Result : {result}
      </Typography>
    </Paper>
  );
};
