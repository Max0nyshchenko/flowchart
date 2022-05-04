import React, { useState, useEffect, useRef } from "react";
import { Typography, TextField, Box, Button, Paper } from "@mui/material";
import { v4 as genUUID } from "uuid";
//import Drawflow from "drawflow";
//import "drawflow/dist/drawflow.min.css";
import Diagram, { useSchema, createSchema } from "beautiful-react-diagrams";
import "beautiful-react-diagrams/styles.css";

const initialSchema = createSchema({
  nodes: [],
  links: [],
});

const AdditionNode = ({ content, inputs, outputs }) => {
  return (
    <Paper elevation={4}>
      <Box sx={{ border: "1px solid red" }}>
        {inputs.map((port) =>
          React.cloneElement(port, {
            style: { width: "25px", height: "25px", background: "#1B263B" },
          })
        )}
        {outputs.map((port) =>
          React.cloneElement(port, {
            style: { width: "25px", height: "25px", background: "#1B263B" },
          })
        )}
      </Box>
      <Typography>Sum: {content}</Typography>
    </Paper>
  );
};

const InputNode = ({ content, outputs, data, inputs }) => {
  console.log("data.schema: ", data.schema);
  return (
    <Paper elevation={4}>
      {inputs.map((port) =>
        React.cloneElement(port, {
          style: { width: "25px", height: "25px", background: "#1B263B" },
        })
      )}
      {outputs.map((port) =>
        React.cloneElement(port, {
          style: { width: "25px", height: "25px", background: "#1B263B" },
        })
      )}
      <Typography>{data.number}</Typography>
      <TextField
        defaultValue={0}
        onChange={(e) => data.onChange({ number: e.target.value })}
      />
    </Paper>
  );
};

export const Flowchart = () => {
  const [schema, { onChange, removeNode, addNode }] = useSchema(initialSchema);

  const deleteNode = (id) => {
    const node = schema.nodes.find((i) => i.id === id);
    node && removeNode(node);
  };

  const addNewNode = (nodeType) => {
    const nodes = {
      input: InputNode,
      addition: AdditionNode,
    };
    const node = {
      id: genUUID(),
      coordinates: [260, 100],
      render: nodes[nodeType],
      inputs: [{ id: genUUID() }, { id: genUUID() }],
      outputs: [{ id: genUUID() }, { id: genUUID() }],
      data: {
        deleteNode,
        number: 0,
        schema,
        onChange: (params) => {
          node.data = { ...node.data, ...params };
          onChange(schema);
        },
      },
    };
    addNode(node);
  };

  return (
    <Paper sx={{ height: 400 }}>
      <Button
        variant="contained"
        onClick={() => onChange({ nodes: [], links: [] })}
      >
        Clear
      </Button>
      <Button variant="contained" onClick={() => addNewNode("input")}>
        Digit
      </Button>
      <Button variant="outlined" onClick={() => addNewNode("addition")}>
        Addition
      </Button>
      <Diagram schema={schema} onChange={onChange} />
    </Paper>
  );
};
// const editorRef = useRef();
// const editor = useRef();

// useEffect(() => {
//   const drawflow = new Drawflow(editorRef.current);
//   drawflow.start();
//   drawflow.reroute = true;
//   var data = { name: "name1" };
//   drawflow.registerNode("test", document.createElement("div"));
//   drawflow.addNode("github", 1, 1, 150, 300, "github", data, "test", true);
//   editor.current = drawflow;
// }, []);
// return <Paper ref={editorRef} sx={{ minHeight: 500 }} />;
