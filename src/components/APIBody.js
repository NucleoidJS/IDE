import ParamView from "./ParamView";
import React from "react";
import Schema from "./Schema";
import { Divider, Grid } from "@mui/material";

import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
  },
  schema: {
    height: "100%",
    width: 400,
    margin: 8,
  },
}));

const APIBody = React.forwardRef(({ method }, ref) => {
  const classes = useStyles();

  const { requestRef, responseRef, paramsRef } = ref;
  const params = [];
  if (requestRef.current || responseRef.current || paramsRef.current)
    Object.keys(paramsRef.current).forEach((key) => {
      params.push(paramsRef.current[key]);
    });

  return (
    <Grid container justifyContent={"space-between"} className={classes.root}>
      <Grid item className={classes.schema}>
        {requestRef && method === "get" && (
          <>
            <br />
            <ParamView params={params} />
          </>
        )}
        {requestRef && method !== "get" && (
          <Schema request edit ref={requestRef} />
        )}
      </Grid>
      <Divider orientation={"vertical"} style={{ height: 350 }} />
      <Grid item className={classes.schema}>
        {responseRef && <Schema response edit ref={responseRef} />}
      </Grid>
    </Grid>
  );
});

export default APIBody;
