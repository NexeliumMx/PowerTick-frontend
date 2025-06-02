// Source: https://github.com/ed-roh/react-admin-dashboard/blob/master/src/theme.js
import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";

export const tokens ={
        grey: {
          100: "#ebf1f1", // Used for neutral.light in themeSettings (e.g. text/backgrounds)
          200: "#dee3e3", // Used as an intermediate light grey
          300: "#d3d8da", // Used as an intermediate light grey
        },
        primary: {
          100: "#373838", // In dark mode this value isn’t mapped but could be used for accents
          200: "#222323", // Mapped to theme.palette.primary.main (dark mode)
          300: "#000000", // Used as darker variant; also repeated in 700, 800, 900 below
        },
        yellowAccent: {
          100: "#eaeb81", // Base value – available but not used specifically (only 600/700 are mapped)
          200: "#dddf7b", // Available for finer accent control if needed
          300: "#d5d777", // Available for finer accent control if needed
        },
        redAccent: {
          100: "#f8dcdb", // Defined for dark mode but not referenced in themeSettings → Unused
          200: "#f1b9b7", // Unused in theme
          300: "#e99592", // Unused in theme
        },
        blueAccent: {
          100: "#e1e2fe", // Defined but not used except for one mapping
          200: "#c3c6fd", // Defined but not used directly
          300: "#a4a9fc", // Defined but not used directly
        },
      }

// mui theme settings
export const themeSettings = (mode) => {
  return{
    palette:{    
       mode: mode,
      ...(mode === "dark"
        ? {
            // palette values for dark mode
            primary: {
              main: tokens.primary[300],
            },
            secondary: {
              main: tokens.grey[100],
              main2: tokens.yellowAccent[200],
              main3: tokens.yellowAccent[300]
            },
            neutral: {
              dark: tokens.grey[300],
              main: tokens.grey[200],
              light:tokens.grey[100],
            },
            background: {
              default: tokens.primary[100],
              paper: tokens.primary[200],
            },
          }
        : {
            // palette values for light mode
            primary: {
              main: tokens.primary[300],
            },
            secondary: {
              main: tokens.primary[200],
              main2: tokens.primary[100],
              main3: tokens.primary[100]
            },
            neutral: {
              dark: tokens.grey[300],
              main: tokens.grey[200],
              light: tokens.grey[100],
            },
            background: {
              default: tokens.grey[100],
              paper: tokens.grey[200],
            },
          }),
    },
    typography: {
      fontFamily: ["Source Sans 3", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Source Sans 3", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Source Sans 3", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Source Sans 3", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Source Sans 3", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Source Sans 3", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Source Sans 3", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};

// context for color mode
// This function allows to change the color mode thorugh the entire the app
export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

// custom hook for setting the color mode
export const useMode = () => {
  const [mode, setMode] = useState("dark");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prev) => (prev === "light" ? "dark" : "light")),
    }),
    []
  );

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return [theme, colorMode];
};