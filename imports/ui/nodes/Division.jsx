import React from "react";
import { BasicNode } from "./BasicNode";

export const DivisionNode = ({ outputs, data, inputs, id }) => {
  return (
    <BasicNode
      {...{ inputs, outputs, id, text: "Division", result: data.division }}
    />
  );
};
