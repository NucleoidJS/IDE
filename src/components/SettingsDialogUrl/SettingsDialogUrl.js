import React from "react";
import project from "../../project";
import styles from "./styles";
import { Box, Divider, Switch, TextField, Typography } from "@mui/material";

const SettingsDialogUrl = React.forwardRef((props, urlRef) => {
  const [url, setUrl] = React.useState(urlRef.current.url);
  const [npx, setNpx] = React.useState(
    urlRef.current.runtime === "npx" ? true : false
  );
  const [description, setDesciption] = React.useState(
    urlRef.current.description
  );

  const context = urlRef.current;

  const handleSetUrl = (value) => {
    context["url"] = value;
    setUrl(value);
  };

  const handleSetDescription = (value) => {
    context["description"] = value;
    setDesciption(value);
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
      <Section title={"Project"}>
        <BetweenComponents title={"Name"}>
          <TextField
            value={project.get().name}
            variant={"outlined"}
            size={"small"}
            disabled={"true"}
            sx={styles.textField}
          />
        </BetweenComponents>
        <Padding />
        <BetweenComponents title={"Description"}>
          <TextField
            InputProps={{ classes: { underline: "red" } }}
            sx={styles.textField}
            value={description}
            multiline
            row={2}
            variant={"outlined"}
            size={"small"}
            onChange={(e) => handleSetDescription(e.target.value)}
          />
        </BetweenComponents>
      </Section>
      <Padding />
      <Section title={"Runtime"}>
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
        <BetweenComponents title={"Url"}>
          <TextField
            size={"small"}
            variant={"outlined"}
            disabled={npx ? false : true}
            value={url}
            sx={styles.textField}
            onChange={(e) => handleSetUrl(e.target.value)}
          />
        </BetweenComponents>
      </Section>
    </Box>
  );
});

const Padding = () => {
  return <Box sx={{ mb: 1 }}></Box>;
};

const Section = ({ children, title, description }) => {
  return (
    <Box
      sx={{
        // bgcolor: "#232323",
        // border: 2,
        // borderColor: "#282828",
        borderRadius: 2,
      }}
    >
      <Box>
        <Box sx={{ p: 2 }}>
          <Typography variant="h6">{title}</Typography>
          <Typography>{description}</Typography>
        </Box>
        <Divider sx={{ borderColor: "#282828" }} />
      </Box>
      <Box sx={{ p: 2 }}>{children}</Box>
    </Box>
  );
};

const BetweenComponents = ({ children, title }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Typography variant={"subtitle2"}>{title}</Typography>
      {children}
    </Box>
  );
};

export default SettingsDialogUrl;
