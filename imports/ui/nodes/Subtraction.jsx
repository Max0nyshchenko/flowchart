import React from "react";
import { BasicNode } from "./BasicNode";

export const SubtractionNode = ({ id, outputs, data, inputs }) => {
  console.log("subtraction: ", data);
  return (
    <BasicNode
      {...{
        outputs,
        inputs,
        id,
        text: "Subtraction",
        result: data.subtraction,
      }}
    />
  );
};
