/**
 * FileName: src/main.jsx
 * Author(s): Arturo Vargas
 * Brief: Entry point for the PowerTick React application.
 * Date: 2024-08-20
 *
 * Description:
 * This file initializes the React application, applying the necessary providers for routing, 
 * theme management, state management, and authentication. It wraps the application inside 
 * the `MsalProvider` to enable authentication with Azure AD B2C.
 *
 * Copyright (c) 2025 BY: Nexelium Technological Solutions S.A. de C.V.
 * All rights reserved.
 *
 * Version History:
 * - 2024-08-20: Initial file creation.
 * - 2024-09-01: Added Material UI and implemented Light/Dark Mode.
 * - 2024-09-11: Created `HomePage` and `NotFound` pages, added MUI test page, and integrated React Router.
 * - 2024-10-04: Implemented mode-based data fetching and improved error handling.
 *     - Added `useFetch` hook to manage data fetching based on the current mode (Demo, Dev, Live).
 * - 2025-02-10: Added MSAL authentication provider (`MsalProvider`) for Azure AD B2C.
 */

// Vanilla imports
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

// MUI imports
import { BrowserRouter } from "react-router-dom";
import { ColorModeContext, useMode } from "./theme.js";
import { CssBaseline, ThemeProvider } from "@mui/material";

// Context imports
import { ModeProvider } from "./context/AppModeContext.jsx";
import { DataProvider } from "./context/DataProvider.jsx";

// MSAL imports
import { MsalProvider } from "@azure/msal-react";
import { msalInstance } from "./services/msalConfig";

function MainApp() {
  const [theme, colorMode] = useMode();

  return (
    <MsalProvider instance={msalInstance}>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <BrowserRouter>
            <ModeProvider>
              <DataProvider>
                <App />
              </DataProvider>
            </ModeProvider>
          </BrowserRouter>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </MsalProvider>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MainApp />
  </StrictMode>
);