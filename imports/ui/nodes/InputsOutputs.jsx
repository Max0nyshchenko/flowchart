import React from "react";
import { Box, Typography } from "@mui/material";

const portStyle = {
  width: 25,
  height: 50,
  background: "lavender",
};

export const InputsOutputs = ({ inputs, outputs, text }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        {inputs.map((port) => React.cloneElement(port, { style: portStyle }))}
      </Box>
      <Typography variant="subtitle1" sx={{ px: 1 }}>
        {text}
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        {outputs.map((port) => React.cloneElement(port, { style: portStyle }))}
      </Box>
    </Box>
  );
};
