import AddIcon from "@material-ui/icons/Add";
import ParamTable from "./ParamTable";
import { Fab, Grid, makeStyles } from "@material-ui/core";
import { forwardRef, useRef } from "react";

const useStyles = makeStyles(() => ({
  root: {
    height: "100%",
  },
  params: {
    height: 350,
    margin: 8,
  },
}));

const APIParams = forwardRef((props, ref) => {
  const classes = useStyles();
  const paramsRef = ref.current;
  const addParamRef = useRef();

  return (
    <Grid
      container
      direction={"column"}
      justifyContent={"space-between"}
      className={classes.root}
    >
      <Grid item className={classes.params}>
        <ParamTable ref={{ paramsRef, addParamRef }} />
      </Grid>
      <Grid container item justifyContent="flex-end">
        <Fab size={"small"} onClick={() => addParamRef.current()}>
          <AddIcon />
        </Fab>
      </Grid>
    </Grid>
  );
});

export default APIParams;
