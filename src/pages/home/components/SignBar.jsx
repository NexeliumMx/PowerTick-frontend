import { useContext } from "react";
import { ColorModeContext } from "../../../theme"; // <-- adjust this path as needed
import {
  Box,
  IconButton,
  useTheme,
  Button,
  Typography,
} from "@mui/material";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import { useMsal } from "@azure/msal-react";

const SignBar = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const { instance } = useMsal();

  const handleSignIn = () => {
    instance.loginRedirect().catch(error => {
      console.error("Login failed:", error);
    });
  };

  const handleTryDemo = () => {
    // TODO: Implement demo mode logic or navigation
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
          sx={{
            width: "45px",
            height: "45px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mr: 2,
          }}
        >
          <img
            src="/assets/logo_powertick-02.svg"
            alt="Logo"
            style={{
              width: "250%",
              height: "250%",
              cursor: "pointer",
              filter: theme.palette.mode === "dark"
                ? "brightness(0) invert(1)"
                : "brightness(0) invert(0)",
            }}
          />
        </Box>
        <Typography
          variant="h3" // Match the top bar title size
          sx={{
            fontWeight: 700,
            color: theme.palette.text.primary,
            letterSpacing: "0.05em",
            ml: 1,
          }}
        >
          PowerTick
        </Typography>
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
        {/* Removed DarkMode, Notifications, and Settings icons */}
      </Box>
    </Box>
  );
};

export default SignBar;
