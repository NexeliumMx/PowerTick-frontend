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
import { ModeProvider } from "./context/AppModeContext.jsx"; // Mode context
import { DataProvider } from "./context/DataProvider.jsx"; // Data context

function MainApp() {
  const [theme, colorMode] = useMode();

  return (
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
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MainApp />
  </StrictMode>
);
