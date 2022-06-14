import React from "react";
import { v4 as uuid } from "uuid";
import { DataGrid } from "@mui/x-data-grid"; //eslint-disable-line

export default function QueryArrayTable({ json }) {
  const generateRowsandColumns = (json, isRow) => {
    const columns = [];
    if (typeof json[0] === "object") {
      if (isRow) {
        json.forEach((item) => {
          Object.keys(item).forEach((obj) => {
            if (typeof item[obj] === "object") {
              item[obj] = JSON.stringify(item[obj]);
            }
          });
        });

        return json;
      } else {
        const obj = json[0];
        Object.keys(obj).forEach((key) => {
          columns.push({
            field: key,
            headerName: key,
            width: 150,
            editable: true,
          });
        });
      }
    } else {
      if (isRow) {
        return json.map((item) => {
          return {
            id: uuid(),
            item,
            width: 150,
          };
        });
      } else {
        columns.push(
          { field: "id", headerName: "ID", width: 150 },
          { field: "item", headerName: "item", width: 150 }
        );
      }
    }

    return columns;
  };

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <DataGrid
        columns={generateRowsandColumns(json)}
        rows={generateRowsandColumns(json, true)}
        pageSize={6}
        visibleColumns={"id"}
        rowsPerPageOptions={[6]}
        disableSelectionOnClick
      />
    </div>
  );
}
