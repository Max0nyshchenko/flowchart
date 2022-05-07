import React from "react";
import { BasicNode } from "./BasicNode";

export const MultiplicationNode = ({ data, id, inputs, outputs }) => {
  return (
    <BasicNode
      {...{
        outputs,
        inputs,
        id,
        text: "Multiplication",
        result: data.multiplication,
      }}
    />
  );
};
