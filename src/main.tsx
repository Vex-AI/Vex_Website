import ReactDOM from "react-dom/client";
import React from "react";

import "./index.css";
import { BrowserRouter as Browser, Route, Routes } from "react-router-dom";
import Home from "./screens/Home";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./classes/translation";
import { UserProvider } from "./components/UserContext";
const theme = createTheme({});
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <UserProvider>
        <Browser>
          <Routes>
            <Route path="/" element={<Home />} />
               <Route path="/:locale" element={<Home />} />
          </Routes>
        </Browser>
      </UserProvider>
    </ThemeProvider>
  </React.StrictMode>
);
