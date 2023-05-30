import ReactDOM from "react-dom/client";
import React from "react";

import "./index.css";
import { BrowserRouter as Browser, Route, Routes } from "react-router-dom";
import Home from "./screens/Home";

import {UserProvider} from "./components/UserContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <UserProvider>
      <Browser>
        <Routes>
          <Route path="*" element={<Home />} />
        </Routes>
      </Browser>
    </UserProvider>
  </React.StrictMode>
);