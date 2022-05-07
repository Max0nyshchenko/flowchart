import React from "react";
import { Paper, Typography } from "@mui/material";
import { useFlowchart } from "../context/SchemaProvider";

export const FlowchartDataViewer = () => {
  const { schema } = useFlowchart();

  return (
    <Paper elevation={4} sx={{ p: 2, m: 3, bgcolor: "lavender" }}>
      <Typography variant="caption">
        <pre>{JSON.stringify(schema, null, 2)}</pre>
      </Typography>
    </Paper>
  );
};
