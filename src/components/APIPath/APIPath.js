import Constants from "../../constants";
import LanguageIcon from "@mui/icons-material/Language";
import Path from "../../utils/Path";
import styles from "./styles";
import {
  Box,
  Button,
  FormControl,
  Grid,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

import { forwardRef, useEffect, useRef, useState } from "react";

const APIPath = forwardRef(
  (
    {
      setApiDialogView,
      view,
      path,
      method,
      handleSaveButtonStatus,
      handleChangeMethod,
    },
    { apiRef, pathRef }
  ) => {
    const api = apiRef.current;
    const [alertPath, setAlertPath] = useState();
    const [disablePath, setDisablePath] = useState();
    const [alertMethod, setAlertMethod] = useState();
    const { prefix, suffix } = Path.split(path);
    const paths = Object.keys(api);
    const originalMethod = useRef();

    const textFieldRef = useRef();

    useEffect(() => {
      originalMethod.current = method;

      if (!method) {
        handleSetMethod();
        setSaveButtonStatus(null, true);
        setAlertMethod(true);
      } else {
        handleSetMethod();
        if (textFieldRef.current !== null) {
          handleCheck(textFieldRef.current.value);
        }
      }
      if (path === "/") {
        setDisablePath(true);
        setAlertPath(false);
        setSaveButtonStatus(false, null);
      }

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSetMethod = () => {
      setAlertMethod(false);
      setSaveButtonStatus(null, false);
    };

    const checkNotAllowedChars = (value) => {
      if (!value.match(/[^a-z{}]/g)) {
        return false;
      } else {
        return true;
      }
    };

    const checkPath = (value) => {
      const paths = pathRef.current.split("/");
      for (let i = 0; i < paths.length - 1; i++) {
        if (paths[i] === value) {
          return true;
        }
      }
      return false;
    };

    const usedMethods = api[path]
      ? Object.keys(api[path]).filter(
          (item) => item !== method && item !== originalMethod.current
        )
      : [];

    const handleCheck = (value) => {
      const slashMark = prefix === "/" ? "" : "/";
      pathRef.current = prefix + slashMark + value;
      const pathStatus = Path.isUsed(paths, prefix, suffix, value);

      const charStatus = checkNotAllowedChars(value);

      const path = checkPath(value);

      setAlertPath(pathStatus || charStatus || path);
      setSaveButtonStatus(pathStatus || charStatus || path, null);
    };

    const setSaveButtonStatus = (path, method) => {
      if (path === null) path = alertPath;
      if (method === null) method = alertMethod;

      if (path || method) {
        handleSaveButtonStatus(true);
      } else {
        handleSaveButtonStatus(false);
      }
    };

    return (
      <Grid container sx={styles.root}>
        <Grid sx={styles.firstElement} />
        <Grid item>
          <Grid container item sx={styles.content}>
            <FormControl variant={"outlined"} size={"small"}>
              <Select
                error={alertMethod}
                value={method || " "}
                onChange={(e) => {
                  handleChangeMethod(e.target.value);
                  handleSetMethod();
                }}
              >
                {Constants.methods
                  .filter((methodName) => !usedMethods.includes(methodName))
                  .map((item, index) => {
                    return (
                      <MenuItem value={item} key={index}>
                        {item.toUpperCase()}
                      </MenuItem>
                    );
                  })}
              </Select>
            </FormControl>
            <Box component={"span"} sx={styles.text}>
              {prefix}
              {Path.addSlashMark(prefix)}
            </Box>
            <TextField
              inputRef={textFieldRef}
              defaultValue={suffix}
              onChange={(e) => handleCheck(e.target.value)}
              sx={styles.textField}
              error={alertPath}
              disabled={disablePath}
            />
          </Grid>
        </Grid>
        <Button
          variant={view === "TYPES" ? "contained" : "outlined"}
          color={view === "TYPES" ? "secondary" : "primary"}
          onClick={() => setApiDialogView("TYPES")}
        >
          <LanguageIcon sx={styles.icon} />
          Types
        </Button>
      </Grid>
    );
  }
);

export default APIPath;
