import React from "react";
import { Box, Button, Paper } from "@mui/material";
import Diagram from "beautiful-react-diagrams";
import { useFlowchart } from "../context/SchemaProvider.jsx";
import "beautiful-react-diagrams/styles.css";

export const Flowchart = () => {
  const { schema, clear, addNewNode, onChange } = useFlowchart();
  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button variant="contained" onClick={clear}>
          Clear
        </Button>
        <Box>
          {[
            "multiplication",
            "addition",
            "division",
            "subtraction",
            "input",
          ].map((type) => (
            <Button
              key={type}
              variant="contained"
              sx={{ mx: 0.5 }}
              onClick={() => addNewNode(type)}
            >
              {type}
            </Button>
          ))}
        </Box>
      </Box>
      <Paper sx={{ height: 600 }}>
        <Diagram schema={schema} onChange={onChange} />
      </Paper>
    </Box>
  );
};
