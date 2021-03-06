import Drawer from "@mui/material/Drawer";
import LgDrawerStyled from "../LgDrawerStyled";
import Logo from "../Logo";
import ProjectSelect from "../../components/ProjectSelect";
import ProjectSelectSmall from "../ProjectSelectSmall/ProjectSelectSmall";
import React from "react";
import Settings from "../Settings";
import SmallLogo from "../SmallLogo";
import Status from "../../widgets/Status";
import StatusSmall from "../../widgets/StatusSmall";
import { drawerWidth } from "../../config";
import styles from "./styles";
import { useLayoutContext } from "../../Context/providers/layoutContextProvider";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { ArrowForwardIos, DensityMedium } from "@mui/icons-material/";
import {
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  useMediaQuery,
} from "@mui/material";

//TODO Split this page as components and styles
function Menu(props) {
  const [openMd, setOpenMd] = React.useState(false);
  const [openLg, setOpenLg] = React.useState(true);
  const theme = useTheme();
  const matchDownMD = useMediaQuery(theme.breakpoints.down("lg"));

  const handleClose = () => {
    setOpenMd(false);
  };

  return (
    <Box component="nav" sx={{ flexShrink: { md: 0 }, zIndex: 1300 }}>
      {matchDownMD ? (
        <>
          {!openMd && (
            <Drawer
              variant="permanent"
              sx={{
                width: 75,
                "& .MuiDrawer-paper": {
                  width: 75,
                },
              }}
            >
              <List>
                <ListItem button onClick={() => setOpenMd(true)}>
                  <SmallLogo />
                </ListItem>
                <br />
                <SmallMenuLinks {...props} />
              </List>
              <ProjectSelectSmall />
              <Box sx={{ height: "100%" }} />
              <StatusSmall />
              <Settings size={"large"} />
              <Button sx={{ pb: 3 }} onClick={() => setOpenMd(true)}>
                <ArrowForwardIos
                  fontSize="small"
                  sx={{ fill: theme.palette.custom.grey }}
                />
              </Button>
            </Drawer>
          )}
          <Drawer
            open={openMd}
            onClose={handleClose}
            ModalProps={{ keepMounted: true }}
            variant="temporary"
            sx={{
              display: { xs: "block", lg: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
                borderRight: `1px solid ${theme.palette.divider}`,
                backgroundImage: "none",
                boxShadow: "inherit",
              },
            }}
          >
            <List>
              <ListItem>
                <Logo title={props.title} />
                <IconButton
                  variant={"contained"}
                  onClick={() => setOpenMd(false)}
                >
                  <DensityMedium
                    fontSize="medium"
                    sx={{ fill: theme.palette.custom.grey }}
                  />
                </IconButton>
              </ListItem>
              <br />
              <MenuLinks {...props} />
            </List>
            <ProjectSelect />
            <Status />
            <Settings size={"large"} />
          </Drawer>
        </>
      ) : (
        <>
          {!openLg && (
            <Drawer
              variant="permanent"
              sx={{
                width: 75,
                "& .MuiDrawer-paper": {
                  width: 75,
                },
              }}
            >
              <List>
                <ListItem button onClick={() => setOpenLg(true)}>
                  <SmallLogo />
                </ListItem>
                <br />
                <SmallMenuLinks {...props} />
              </List>
              <ProjectSelectSmall />
              <Box sx={{ height: "100%" }} />
              <StatusSmall />
              <Settings size={"large"} />
              <Button sx={{ pb: 3 }} onClick={() => setOpenLg(true)}>
                <ArrowForwardIos
                  fontSize="small"
                  sx={{
                    fill: theme.palette.custom.grey,
                  }}
                />
              </Button>
            </Drawer>
          )}
          <LgDrawerStyled variant="permanent" open={openLg}>
            <List>
              <ListItem>
                <Logo title={props.title} />
                <IconButton
                  variant={"contained"}
                  onClick={() => setOpenLg(false)}
                >
                  <DensityMedium
                    fontSize="medium"
                    sx={{ fill: theme.palette.custom.grey }}
                  />
                </IconButton>
              </ListItem>
              <br />
              <MenuLinks {...props} />
            </List>
            <ProjectSelect />
            <Status />
            <Settings size={"large"} />
          </LgDrawerStyled>
        </>
      )}
    </Box>
  );
}
const MenuLinks = (props) => {
  const [layoutContext] = useLayoutContext();
  const navigate = useNavigate();

  return (
    <>
      {props.list.map(({ title, link, anchor, icon }) => (
        <React.Fragment key={title}>
          <ListItem
            disabled={
              (title === "Logs" && layoutContext.status === "unreachable") ||
              (title === "Query" && layoutContext.status === "unreachable")
            }
            sx={styles.listItem}
            onClick={() => navigate(link, { state: { anchor } })}
            button
          >
            <ListItemIcon sx={styles.listItemIcon}>{icon}</ListItemIcon>
            <ListItemText primary={title} />
          </ListItem>
        </React.Fragment>
      ))}
    </>
  );
};

const SmallMenuLinks = (props) => {
  const [layoutContext] = useLayoutContext();
  const navigate = useNavigate();

  return (
    <>
      {props.list.map(({ title, link, anchor, icon }) => (
        <ListItem
          key={title}
          disabled={
            (title === "Logs" && layoutContext.status === "unreachable") ||
            (title === "Query" && layoutContext.status === "unreachable")
          }
          onClick={() => navigate(link, { state: { anchor } })}
          button
        >
          <Tooltip placement="right" title={title}>
            <Box sx={styles.listItemIconSmall}>{icon}</Box>
          </Tooltip>
        </ListItem>
      ))}
    </>
  );
};

export default Menu;
