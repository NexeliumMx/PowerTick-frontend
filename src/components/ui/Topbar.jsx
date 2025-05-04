import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import { ModeContext } from "../../context/AppModeContext";
import {
  Box,
  IconButton,
  useTheme,
  MenuItem,
  Select,
  useMediaQuery,
  Typography,
} from "@mui/material";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";

const Topbar = ({ handleDrawerToggle }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const { state, dispatch } = useContext(ModeContext);

  // Detect small screens (sm and xs)
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleModeChange = (event) => {
    const selectedMode = event.target.value;
    dispatch({ type: `SET_${selectedMode}` });
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
      {/* Left Section: Logo, Typography, and Menu Toggle */}
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box
          sx={{
            width: isSmallScreen ? "0px" : "150px",
            height: "45px",
            overflow: "hidden",
            transition: "width 0.3s ease, opacity 0.3s ease",
            opacity: isSmallScreen ? 0 : 1,
            visibility: isSmallScreen ? "hidden" : "visible",
            display: "flex",
            alignItems: "center",
          }}
        >
          <img
            src="/assets/logo_powertick-02.svg"
            alt="Logo"
            style={{
              width: "100%",
              height: "100%",
              cursor: "pointer",
              filter: "brightness(0) invert(1)", // Makes logo white
            }}
          />
          {!isSmallScreen && (
            <Box sx={{ ml: 1, mr: 1, display: "flex", alignItems: "center" }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  fontSize: "1.2rem",
                  color: theme.palette.text.primary,
                  letterSpacing: "0.05em",
                }}
              >
                PowerTick
              </Typography>
            </Box>
          )}
        </Box>
        {/* PowerTick Typography */}

        <IconButton onClick={handleDrawerToggle}>
          <MenuIcon />
        </IconButton>
      </Box>
      {/* Center: Search Bar */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          backgroundColor: theme.palette.background.default,
          borderRadius: "8px",
          padding: "0.5rem",
          width: isSmallScreen ? "0px" : "300px",
          opacity: isSmallScreen ? 0 : 1,
          visibility: isSmallScreen ? "hidden" : "visible",
          transition: "width 0.3s ease, opacity 0.3s ease",
          overflow: "hidden",
        }}
      >
        <SearchIcon style={{ marginRight: "8px" }} />
        <InputBase
          sx={{ flex: 1, color: colors.grey[100] }}
          placeholder="Search..."
          inputProps={{ "aria-label": "search" }}
        />
      </Box>

      {/* Right Section */}
      <Box sx={{ display: "flex", alignItems: "center" }}>
        {/* Mode Switcher */}
        {!isSmallScreen && (
          <Select
            value={state.mode}
            onChange={handleModeChange}
            sx={{ color: colors.grey[100], marginRight: "16px" }}
          >
            <MenuItem value="DEMO_MODE">Demo Mode</MenuItem>
            <MenuItem value="LIVE_MODE">Live Mode</MenuItem>
          </Select>
        )}

        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>

        <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton>
          <SettingsOutlinedIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;
