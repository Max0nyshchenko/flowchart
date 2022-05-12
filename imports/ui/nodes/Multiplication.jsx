import React from "react";
import { BasicNode } from "./BasicNode";

export const MultiplicationNode = ({ data, id, inputs, outputs }) => {
  console.log("multiplication data: ", data);

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
