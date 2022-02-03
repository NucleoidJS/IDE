import { TreeItem } from "@mui/lab";
import React, { useRef, useState } from "react";
import { TextField } from "@mui/material";

import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  textField: {
    width: theme.custom.schema.width,
  },
}));

function SchemaObject({ name, edit, map, children, ...other }) {
  const classes = useStyles();
  const [value, setValue] = useState(name);
  const textField = useRef();

  return (
    <TreeItem
      onLabelClick={(event) => event.preventDefault()}
      label={
        <>
          {name !== undefined && (
            <>
              {edit && (
                <TextField
                  size={"small"}
                  className={classes.textField}
                  value={value || ""}
                  onChange={(event) =>
                    setValue((map.name = event.target.value))
                  }
                  inputRef={textField}
                  onClick={() => setTimeout(() => textField.current.focus(), 0)}
                />
              )}
              {!edit && <>"{value}"</>}
              <>:&nbsp;</>
            </>
          )}
          &#123;
        </>
      }
      {...other}
    >
      {children}
      &nbsp;&nbsp;&#125;
    </TreeItem>
  );
}

export default SchemaObject;
