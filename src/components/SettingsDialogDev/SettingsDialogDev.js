import React from "react";
import Settings from "../../settings";
import styles from "./styles";
import { Box, Switch, Typography } from "@mui/material";

const SettingsDialogDev = () => {
  const [beta, setBeta] = React.useState(Settings.beta());
  const [debug, setDebug] = React.useState(Settings.debug());

  return (
    <Box sx={styles.root}>
      <Box sx={styles.itemContainer}>
        <Typography>Beta</Typography>
        <Switch
          color="secondary"
          checked={beta}
          onChange={(e) => {
            setBeta(e.target.checked);
            Settings.beta(e.target.checked);
          }}
        />
      </Box>
      <Box sx={styles.itemContainer}>
        <Typography>Debug</Typography>
        <Switch
          color="secondary"
          checked={debug}
          onChange={(e) => {
            setDebug(e.target.checked);
            Settings.debug(e.target.checked);
          }}
        />
      </Box>
    </Box>
  );
};

export default SettingsDialogDev;
