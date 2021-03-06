import Editor from "../../../widgets/Editor";
import Moment from "react-moment";
import service from "../../../service";
import styles from "./styles";
import { v4 as uuid } from "uuid";
import { Grid, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

function Logs() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    service.logs().then((logs) => {
      setLogs([...logs.slice(0, 25)]);
    });
  }, []);

  return (
    <>
      <Grid container>
        <Grid container item justifyContent={"center"}>
          <Typography variant="h5" gutterBottom component="div">
            Logs
          </Typography>
        </Grid>
        <Grid
          container
          item
          direction={"column"}
          justifyContent={"flex-start"}
          alignContent={"center"}
        >
          {logs.map((log) => (
            <Paper key={uuid()} sx={styles.logitem}>
              <Editor name={"log"} log={log.s} readOnly />
              <Grid container justifyContent={"center"}>
                <Moment date={log.d} format="MM/DD hh:mm:ss" />{" "}
                &nbsp;&nbsp;-&nbsp;&nbsp;
                {log.t}ms
              </Grid>
            </Paper>
          ))}
        </Grid>
      </Grid>
    </>
  );
}

export default Logs;
