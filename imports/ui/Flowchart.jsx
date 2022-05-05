import React, { useState, useEffect, useRef } from "react";
import { Typography, TextField, Box, Button, Paper } from "@mui/material";
import { v4 as genUUID } from "uuid";
import Diagram, { createSchema } from "beautiful-react-diagrams";
import { useFlowchart } from "./SchemaProvider.jsx";
import "beautiful-react-diagrams/styles.css";

export const Flowchart = () => {
  const { schema, clear, addNewNode, onChange } = useFlowchart();
  return (
    <Paper sx={{ height: 400 }}>
      <Button variant="contained" onClick={clear}>
        Clear
      </Button>
      <Button variant="contained" onClick={() => addNewNode("input")}>
        Digit
      </Button>
      <Button variant="outlined" onClick={() => addNewNode("addition")}>
        Addition
      </Button>
      <Diagram schema={schema} onChange={onChange} />
    </Paper>
  );
};
