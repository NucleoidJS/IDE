import { DataGrid } from "@mui/x-data-grid";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import TypeMenu from "../TypeMenu";
import styles from "./styles";
import { v4 as uuid } from "uuid";
import { Checkbox, IconButton, TextField } from "@mui/material";
import React, { useState } from "react";

const ParamTable = React.forwardRef(({ types }, { paramsRef, addParams }) => {
  const [params, setParams] = useState(paramsRef.current);

  addParams.current = () => {
    const id = uuid();
    paramsRef.current[id] = {
      id: id,
      in: "query",
      type: "string",
      required: true,
    };
    setParams({ ...paramsRef.current });
  };

  const removeParam = (id) => {
    delete paramsRef.current[id];
    setTimeout(() => setParams({ ...paramsRef.current }), 0);
    // TODO Check "No row with id" issue in MUI 5
  };

  const columns = [
    {
      field: "name",
      headerName: "Name",
      renderCell: (param) => {
        const { id } = param.row;
        return (
          <TextField
            disabled={param.row.in === "path"}
            defaultValue={param.value}
            onChange={(event) => (params[id].name = event.target.value)}
          />
        );
      },
      flex: 1,
    },
    {
      field: "type",
      headerName: "Type",
      renderCell: (param) => {
        const { id } = param.row;
        return (
          <TypeMenu
            disabled={param.row.in === "path"}
            primitive
            types={types}
            ref={params}
            id={id}
            type={param.value}
            edit
          />
        );
      },
      flex: 1,
    },
    {
      field: "in",
      headerName: "Param",
      flex: 1,
      valueGetter: (param) => param.value || "query",
    },
    {
      field: "required",
      headerName: "Required",
      renderCell: (param) => {
        const { id } = param.row;
        return (
          <Checkbox
            disabled={param.row.in === "path"}
            defaultChecked={param.value}
            onChange={(event) => (params[id].required = event.target.checked)}
          />
        );
      },
      flex: 1,
    },
    {
      field: "description",
      headerName: "Description",
      renderCell: (param) => {
        const { id } = param.row;
        return (
          <TextField
            disabled={param.row.in === "path"}
            defaultValue={param.value}
            onChange={(event) => (params[id].description = event.target.value)}
            fullWidth
          />
        );
      },
      flex: 2,
    },
    {
      field: "action",
      headerName: " ",
      sortable: false,
      renderCell: (param) => {
        const { id } = param.row;
        return (
          <IconButton
            disabled={param.row.in === "path"}
            onClick={() => removeParam(id)}
            size="large"
          >
            <HighlightOffIcon />
          </IconButton>
        );
      },
    },
  ];

  return (
    <DataGrid
      sx={styles.dataGrid}
      columns={columns}
      rows={Object.values(params).filter((p) => p.id)}
      hideFooter
      disableSelectionOnClick
    />
  );
});

export default ParamTable;
