import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { CssBaseline } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { EmployeeContext } from "../context/EmployeeContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <EmployeeContext>
        <CssBaseline />
        <App />
      </EmployeeContext>
    </BrowserRouter>
  </React.StrictMode>
);
