import CodeSandboxIcon from "../icons/CodeSandbox";
import CopyClipboard from "./CopyClipboard";
import DialogTooltip from "./DialogTootip";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import Settings from "../settings";
import {
  AppBar,
  Box,
  Dialog,
  IconButton,
  Slide,
  Switch,
  Toolbar,
  Typography,
} from "@mui/material";

import * as React from "react";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CodeSandboxDialog({ open, handleCloseSandboxDialog }) {
  const [npx, setNpx] = React.useState(false);
  const [alert, setAlert] = React.useState(false);

  const switchSandboxToNpx = () => {
    Settings.url.app(`http://localhost:3000/`);
    Settings.url.terminal(`http://localhost:8448/`);
    localStorage.removeItem("sandbox_id");
    Settings.runtime("npx");
  };

  return (
    <Dialog
      fullScreen
      open={open === undefined ? false : open}
      onClose={handleCloseSandboxDialog}
      TransitionComponent={Transition}
      aria-describedby="alert-dialog-slide-description"
    >
      <AppBar
        sx={{
          position: "relative",
          backgroundColor: "#323a40",
          color: "#e0e0e0",
        }}
        color={"default"}
      >
        <Toolbar>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <IconButton
                edge="start"
                onClick={() => {
                  if (npx) {
                    switchSandboxToNpx();
                  }
                  handleCloseSandboxDialog();
                }}
                aria-label="close"
              >
                <KeyboardArrowDown sx={{ color: "#e0e0e0" }} fontSize="large" />
              </IconButton>
              <Box
                sx={{
                  ml: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <CodeSandboxIcon fill={"#e0e0e0"} />
                <Typography sx={{ pl: 3 / 2 }} variant="h6">
                  CodeSandbox
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography>Run on npx</Typography>
              <DialogTooltip
                open={alert}
                placement="bottom-start"
                title={<b>Runtime</b>}
                message={
                  <>
                    Run the following code in your terminal
                    <br />
                    <CopyClipboard />
                    <br />
                  </>
                }
                handleTooltipClose={() => setAlert(false)}
              >
                <Switch
                  value={alert}
                  color="default"
                  onChange={(e) => {
                    setNpx(e.target.checked);
                    setAlert(e.target.checked);
                  }}
                />
              </DialogTooltip>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <iframe
        title="CodeSandbox"
        src={`https://codesandbox.io/embed/${Settings.codesandbox.sandboxID()}?fontsize=14&hidenavigation=1&theme=dark&editorsize=35`}
        style={{
          width: "100%",
          height: "100%",
          border: 0,
        }}
        //onLoad={() => setClose(false)}
        allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
        sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
      ></iframe>
    </Dialog>
  );
}
