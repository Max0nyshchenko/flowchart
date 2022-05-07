import React from "react";
import { BasicNode } from "./BasicNode";

export const AdditionNode = ({ data, inputs, outputs, id }) => {
  return (
    <BasicNode
      {...{ outputs, inputs, id, text: "Addition", result: data.addition }}
    />
  );
};
