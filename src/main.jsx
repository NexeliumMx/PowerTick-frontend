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
 * - 2024-09-01: Added Material UI and implemented Light/Dark Mode.
 * - 2024-09-11: Created `HomePage` and `NotFound` pages, added MUI test page, and integrated React Router.
 * - 2024-10-04: Implemented mode-based data fetching and improved error handling.
 * - 2025-02-10: Added MSAL authentication provider (`MsalProvider`) for Azure AD B2C.
 * - 2025-05-16: Integrated React Query for data fetching and caching.
 * - 2025-05-20: Added context for application mode management and theme switching.
 * - 2025-05-25: Implemented `ModeProvider` for managing application modes (Demo, Dev, Production).
 * - 2025-06-02: Remove React Strict Mode to avoid double rendering issues in production.
 * - 2025-07-21: Added API warmup functionality to ping Azure Functions on app startup.
 */

// React imports
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

// MUI imports
import { BrowserRouter } from "react-router-dom";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";

// Context imports
import { ModeProvider } from "./context/AppModeContext.jsx";

// Services imports
import { MsalProvider } from "@azure/msal-react";
import { msalInstance } from "./services/auth/msalConfig.js";
import ReactQueryProvider from "./services/reactQuery/ReactQueryProvider.jsx";
import './services/i18n/i18n';

// API warmup imports
import { useApiWarmup } from "./hooks/useApiWarmup.js";

/**
 * Component to handle API warmup on application startup
 */
function ApiWarmup() {
  useApiWarmup({
    enabled: true,
    timeout: 10000, // 10 seconds timeout
  });

  return null; // This component doesn't render anything
}

function MainApp() {
  const [theme, colorMode] = useMode();

  return (
    <MsalProvider instance={msalInstance}>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <BrowserRouter>
            <ModeProvider>
              <ReactQueryProvider>
                <ApiWarmup />
                <App />
              </ReactQueryProvider>
            </ModeProvider>
          </BrowserRouter>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </MsalProvider>
  );
}

createRoot(document.getElementById("root")).render(
  <MainApp />
);