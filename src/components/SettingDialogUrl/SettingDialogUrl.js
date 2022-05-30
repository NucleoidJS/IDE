import React from "react";
import TextField from "@mui/material/TextField";
import styles from "./styles";

const SettingDialogUrl = React.forwardRef((props, urlRef) => {
  const url = urlRef.current;

  return (
    <>
      <TextField
        label="Nucleoid Runtime URL"
        defaultValue={url["terminal"]}
        sx={styles.textField}
        onChange={(e) => (url["terminal"] = e.target.value)}
      />
      <TextField
        label="OpenAPI URL"
        defaultValue={url["app"]}
        sx={styles.textField}
        onChange={(e) => (url["app"] = e.target.value)}
      />
    </>
  );
});

export default SettingDialogUrl;
