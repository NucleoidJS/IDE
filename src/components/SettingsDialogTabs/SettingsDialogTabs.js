import SettingsDialogAdvanced from "../SettingsDialogAdvanced";
import SettingsDialogUrl from "../SettingsDialogUrl";

import TabPanel from "../TabPanel";
import styles from "./styles";
import { Grid, Tab, Tabs } from "@mui/material";
import React, { forwardRef, useState } from "react";

const SettingsDialogTabs = forwardRef((props, urlRef) => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function tabProps(index) {
    return {
      id: `vertical-tab-${index}`,
      "aria-controls": `vertical-tabpanel-${index}`,
    };
  }

  return (
    <Grid sx={styles.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        sx={styles.tabs}
      >
        <Tab sx={styles.tab} label="Runtime" {...tabProps(0)} />
        <Tab sx={styles.tab} label="Advanced" {...tabProps(1)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <SettingsDialogUrl ref={urlRef} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <SettingsDialogAdvanced />
      </TabPanel>
    </Grid>
  );
});

export default SettingsDialogTabs;
