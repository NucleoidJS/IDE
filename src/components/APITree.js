import ArrowIcon from "../icons/Arrow";
import { useContext } from "../context";
import { Box, Menu, MenuItem } from "@material-ui/core";
import React, { useEffect } from "react";
import { TreeItem, TreeView } from "@material-ui/lab";

const style = {
  fontSize: 12,
  color: "#666",
  fontWeight: "bold",
  backgroundColor: "#fdfdfd",
  border: `1px solid #c3c5c8`,
  width: 44,
  borderRadius: 8,
  marginTop: 1,
  marginBottom: 1,
  boxShadow: "1px 1px #b8b8b8",
};

const map = {};

function APITree() {
  const [selected, setSelected] = React.useState(null);
  const [contextMenu, setContextMenu] = React.useState(null);
  const [state, dispatch] = useContext();
  const api = state.get("nucleoid.api");
  const list = Object.keys(api).map((key) => ({
    path: key,
    methods: Object.keys(api[key]),
  }));

  const select = (id) => {
    if (map[id]) {
      setSelected(id);
      dispatch({ type: "SET_SELECTED_API", payload: map[id] });
    }
  };

  const handleContextMenu = (event, hash) => {
    event.preventDefault();

    if (hash) select(hash);
    setContextMenu(
      !contextMenu
        ? {
            mouseX: event.clientX,
            mouseY: event.clientY,
          }
        : null
    );
  };

  const handleClose = () => {
    setContextMenu(null);
  };

  useEffect(() => {
    if (!selected) {
      select(Object.keys(map).pop());
    }
  });

  const graph = {};

  list.forEach((each) => {
    const parts = each.path.substring(1).split("/");
    const label = "/" + parts.pop();
    const parent = "/" + parts.join("/");

    const node = {
      label,
      path: each.path,
      resources: [],
      methods: each.methods,
    };

    if (graph[parent]) graph[parent].resources.push(node);

    graph[each.path] = node;
  });

  return (
    <>
      <TreeView
        defaultCollapseIcon={<ArrowIcon down />}
        defaultExpandIcon={<ArrowIcon right />}
        defaultExpanded={list.map((api) => api.path)}
        onNodeSelect={(event, value) => select(value)}
        selected={selected}
      >
        {compile([graph["/"]], handleContextMenu)}
      </TreeView>
      <Menu
        open={contextMenu !== null}
        onClose={handleClose}
        onContextMenu={(event) => event.preventDefault()}
        anchorReference="anchorPosition"
        anchorPosition={
          contextMenu !== null
            ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
            : undefined
        }
      >
        <MenuItem onClick={handleClose}>Edit</MenuItem>
        <MenuItem onClick={handleClose}>Delete</MenuItem>
      </Menu>
    </>
  );
}

const compile = (list, handleContextMenu) =>
  list.map((api) => {
    let children = undefined;

    if (api.resources && api.resources.length > 0) {
      children = compile(api.resources, handleContextMenu);
    }

    children = api.methods
      .map((method) => {
        const payload = { path: api.path, method };
        const hash = btoa(JSON.stringify(payload));
        map[hash] = payload;

        return (
          <TreeItem
            key={hash}
            nodeId={hash}
            onContextMenu={(event) => handleContextMenu(event, hash)}
            label={
              <Box style={style}>
                <center>{method.toUpperCase()}</center>
              </Box>
            }
          />
        );
      })
      .concat(children);

    return (
      <TreeItem
        key={api.path}
        nodeId={api.path}
        label={api.label}
        children={children}
        onLabelClick={(event) => {
          event.preventDefault();
        }}
      />
    );
  });

export default APITree;