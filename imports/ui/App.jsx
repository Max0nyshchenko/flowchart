import React from "react";
import { Flowchart } from "./diagram/Flowchart.jsx";
import { SchemaProvider } from "./context/SchemaProvider.jsx";

export const App = () => (
  <SchemaProvider>
    <Flowchart />
  </SchemaProvider>
);
