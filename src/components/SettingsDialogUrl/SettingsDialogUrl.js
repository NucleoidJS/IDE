import React from "react";
import project from "../../project";
import styles from "./styles";
import { Box, Divider, Switch, TextField, Typography } from "@mui/material";

const SettingsDialogUrl = React.forwardRef((props, urlRef) => {
  const [url, setUrl] = React.useState(urlRef.current.url);
  const [npx, setNpx] = React.useState(
    urlRef.current.runtime === "npx" ? true : false
  );

  const context = urlRef.current;

  const handleSetUrl = (value) => {
    context["url"] = value;
    setUrl(value);
  };

  const handleSetRuntime = (value) => {
    context["runtime"] = value ? "npx" : "sandbox";

    if (
      context["runtime"] === "npx" &&
      context["url"] !== "http://localhost:8448/"
    ) {
      context["url"] = "http://localhost:8448/";
      setUrl(context["url"]);
    }
    setNpx(value);
  };

  return (
    <Box sx={styles.root}>
      <Sectipon title={"Project"}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 2,
          }}
        >
          <Typography sx={{ fontWeight: "bold" }}>Project name</Typography>
          <Typography sx={{ color: "#F5F5F5" }}>
            {project.get().name}
          </Typography>
        </Box>
        <Box sx={{ mb: 1 }}>
          <TextField
            value={"test"}
            variant={"outlined"}
            size={"small"}
            label={"Description"}
            sx={styles.textField}
            onChange={(e) => handleSetUrl(e.target.value)}
          />
        </Box>
      </Sectipon>
      <Sectipon title={"Runtime"}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: 35,
            mb: 2,
          }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Typography
              fontWeight={!npx ? "bold" : null}
              sx={{
                pl: 1,
                fontSize: !npx ? "16px" : "15px",
                width: 108,
              }}
            >
              CodeSandbox
            </Typography>
          </Box>
          <Box
            sx={{
              width: "30%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Switch
              checked={npx}
              color="default"
              onChange={(e) => handleSetRuntime(e.target.checked)}
            />
          </Box>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-start",
            }}
          >
            <Typography
              fontWeight={npx ? "bold" : null}
              sx={{ pr: 1, fontSize: npx ? "16px" : "15px" }}
            >
              npx
            </Typography>
          </Box>
        </Box>
        <TextField
          label="Runtime Url"
          variant={"outlined"}
          size={"small"}
          disabled={npx ? false : true}
          value={url}
          sx={styles.textField}
          onChange={(e) => handleSetUrl(e.target.value)}
        />
      </Sectipon>
    </Box>
  );
});

const Sectipon = ({ children, title }) => {
  return (
    <Box
      sx={{
        mb: 4,
      }}
    >
      <Divider sx={{ mb: 1 }}>{title}</Divider>
      {children}
    </Box>
  );
};

export default SettingsDialogUrl;
