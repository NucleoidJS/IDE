import API from "./pages/ide/API";
import Dev from "./pages/Dev";
import Functions from "./pages/ide/Functions";
import GlobalStoreProvider from "./Context/GlobalStoreProvider";
import IDE from "./layouts/IDE";
import Login from "./pages/ide/login";
import Logs from "./pages/ide/Logs";
import Mobile from "./pages/ide/Mobile";
import Query from "./pages/ide/Query";
import React from "react";
import Settings from "./settings";
import theme from "./theme";

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import {
  CssBaseline,
  StyledEngineProvider,
  ThemeProvider,
  useMediaQuery,
} from "@mui/material";

function App() {
  const matchDownSM = useMediaQuery(theme.breakpoints.down("sm"));

  if (Settings.debug()) {
    console.debug = {};
  }

  React.useEffect(() => {
    const elapsed = Date.now() - window.start;
    const delay =
      window.location.hostname === "nucleoid.com" ? 2000 - elapsed : 0;

    setTimeout(() => {
      const progressElement = document.getElementById("nuc-progress-indicator");
      if (progressElement) {
        progressElement.classList.add("available");
      }
    }, delay);
  }, []);

  if (matchDownSM) return <Mobile />;

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStoreProvider>
          <BrowserRouter basename="ide">
            <Routes>
              <Route path="/" element={<IDE />}>
                <Route index element={<Navigate to="/api" />} />
                <Route path="/api" element={<API />} />
                <Route path={"/functions"} element={<Functions />} />
                <Route path={"/query"} element={<Query />} />
                <Route path={"/logs"} element={<Logs />} />
                <Route path={"/dev"} element={<Dev />} />
                <Route path={"/login"} element={<Login />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </GlobalStoreProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
