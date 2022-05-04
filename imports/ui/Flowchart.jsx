import React, { useEffect, useRef } from "react";
import { TextField, Box, Button, Paper } from "@mui/material";
import { v4 as genUUID } from "uuid";
//import Drawflow from "drawflow";
import Diagram, { useSchema, createSchema } from "beautiful-react-diagrams";
import "drawflow/dist/drawflow.min.css";
import "beautiful-react-diagrams/styles.css";

const initialSchema = createSchema({
  nodes: [],
  links: [],
});

const AdditionNode = ({ data }) => {
  return (
    <Paper elevation={4}>
      <Box sx={{ border: "1px solid red" }}>
        {inputs.map((port) =>
          React.cloneElement(port, {
            style: { width: "25px", height: "25px", background: "#1B263B" },
          })
        )}
      </Box>
      <TextField
        defaultValue={0}
        onChange={(e) => data.onChange(e.target.value)}
      />
    </Paper>
  );
};

const InputNode = ({ outputs, data, inputs }) => {
  return (
    <Paper elevation={4}>
      <Box sx={{ border: "1px solid red" }}>
        {inputs.map((port) =>
          React.cloneElement(port, {
            style: { width: "25px", height: "25px", background: "#1B263B" },
          })
        )}
      </Box>
      {outputs.map((port) =>
        React.cloneElement(port, {
          style: { width: "25px", height: "25px", background: "#1B263B" },
        })
      )}
      <TextField
        defaultValue={0}
        onChange={(e) => data.onChange(e.target.value)}
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
      inputs: [{ id: genUUID() }],
      data: {
        deleteNode,
        onChange: (v) => (node.content = +v),
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
      <Button variant="contained" onClick={addNewNode}>
        Add new digit node
      </Button>
      <Button variant="outlined" onClick={addNewNode}>
        Add new arythmetic node
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
