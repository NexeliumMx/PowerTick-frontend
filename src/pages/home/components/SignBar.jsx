import { useContext } from "react";
import { ColorModeContext } from "../../../theme";
import {
  Box,
  IconButton,
  useTheme,
  Button,
  Typography,
} from "@mui/material";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import { useMsal } from "@azure/msal-react";
import { Link, useLocation } from "react-router-dom";

const SignBar = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const { instance } = useMsal();
  const location = useLocation();

  const handleSignIn = () => {
    instance.loginRedirect().catch(error => {
      console.error("Login failed:", error);
    });
  };

  const handleTryDemo = () => {
    alert("Demo mode not implemented yet.");
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px 24px",
        backgroundColor: theme.palette.background.paper,
        width: "100%",
      }}
    >
      {/* Left: Logo and Title */}
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box
          component={Link}
          to="/"
          sx={{
            width: "45px",
            height: "45px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mr: 2,
            textDecoration: "none",
          }}
        >
          <img
            src="/assets/logo_powertick-02.svg"
            alt="Logo"
            style={{
              width: "180%",
              height: "180%",
              cursor: "pointer",
              filter: theme.palette.mode === "dark"
                ? "brightness(0) invert(1)"
                : "brightness(0) invert(0)",
            }}
          />
        </Box>
        <Typography
          variant="h3"
          component={Link}
          to="/"
          sx={{
            fontWeight: 700,
            color: theme.palette.text.primary,
            letterSpacing: "0.05em",
            ml: 1,
            textDecoration: "none",
            cursor: "pointer",
          }}
        >
          PowerTick
        </Typography>
      </Box>
      {/* Center: Navigation Links */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
        <Button
          component={Link}
          to="/home-pages/update-log"
          sx={{
            textDecoration: location.pathname === "/home-pages/update-log" ? "underline" : "none",
            color: "text.primary",
            fontWeight: location.pathname === "/home-pages/update-log" ? "bold" : "normal",
            mx: 1,
          }}
        >
          Novedades
        </Button>
          <Button
          component={Link}
          to="/home-pages/codigo-de-red"
          sx={{
            textDecoration: location.pathname === "/home-pages/codigo-de-red" ? "underline" : "none",
            color: "text.primary",
            fontWeight: location.pathname === "/home-pages/codigo-de-red" ? "bold" : "normal",
            mx: 1,
          }}
        >
          Código de Red
        </Button>
        <Button
          component={Link}
          to="/home-pages/acerca-de"
          sx={{
            textDecoration: location.pathname === "/home-pages/acerca-de" ? "underline" : "none",
            color: "text.primary",
            fontWeight: location.pathname === "/home-pages/acerca-de" ? "bold" : "normal",
            mx: 1,
          }}
        >
          Acerca De
        </Button>

        {/* Add more navigation links here as needed */}
      </Box>
      {/* Right: Buttons and Icons */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Button
          variant="outlined"
          color="secondary"
          sx={{ fontWeight: 600, textTransform: "none" }}
          onClick={handleTryDemo}
        >
          Try Demo
        </Button>
        <Button
          variant="contained"
          color="primary"
          sx={{ fontWeight: 600, textTransform: "none" }}
          onClick={handleSignIn}
        >
          Sign In
        </Button>
        <IconButton onClick={colorMode.toggleColorMode}>
          <LightModeOutlinedIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default SignBar;
