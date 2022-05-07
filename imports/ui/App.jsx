import React from "react";
import { Flowchart, FlowchartDataViewer } from "./diagrams";
import { SchemaProvider } from "./context/SchemaProvider";

export const App = () => (
  <SchemaProvider>
    <Flowchart />
    <FlowchartDataViewer />
  </SchemaProvider>
);
