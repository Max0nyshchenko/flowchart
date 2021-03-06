import React from "react";
import {
  Checkbox,
  Tooltip,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { InputsOutputs } from "./InputsOutputs";
import { useNode } from "../context/SchemaProvider";

export const BasicNode = ({ inputs, outputs, text, id, result }) => {
  const { deleteNode, changeData } = useNode(id);

  return (
    <Paper elevation={4} sx={{ overflow: "hidden", pt: 3 }}>
      <Tooltip title="Freeze node (node will be skipped in calculations of other nodes)">
        <Checkbox
          sx={{ position: "absolute", left: -9, top: -8 }}
          onChange={(_, checked) => changeData({ freezed: checked })}
        />
      </Tooltip>
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
