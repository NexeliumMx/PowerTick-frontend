// Theme imports
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import { ModeContext } from "../../context/AppModeContext"; // Import the context

// Component Imports
import { Box, IconButton, useTheme, MenuItem, Select } from "@mui/material";
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
  
  // Get mode and dispatch from ModeContext
  const { state, dispatch } = useContext(ModeContext);

  const handleModeChange = (event) => {
    const selectedMode = event.target.value;

    if (selectedMode === "DEMO_MODE") {
      dispatch({ type: "SET_DEMO_MODE" });
    } else if (selectedMode === "DEV_MODE") {
      dispatch({ type: "SET_DEV_MODE" });
    } else if (selectedMode === "LIVE_MODE") {
      dispatch({ type: "SET_LIVE_MODE" });
    }
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
      {/* Left Section: Logo and Menu Toggle */}
      <Box sx={{ display: "flex", alignItems: "center" }}>
        {/* Logo */}
        <img
          src="/assets/logoipsum-288.svg"
          alt="Logo"
          style={{ width: "150px", height: "40px", cursor: "pointer" }}
        />
        {/* Menu Toggle Button */}
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
          width: "300px",
        }}
      >
        <SearchIcon style={{ marginRight: "8px" }} />
        <InputBase
          sx={{ flex: 1, color: colors.grey[100] }}
          placeholder="Search..."
          inputProps={{ "aria-label": "search" }}
        />
      </Box>

      {/* Right Section: Context Switch, Contrast Toggle, Notifications, and Settings */}
      <Box sx={{ display: "flex", alignItems: "center" }}>
        {/* Mode Switcher */}
        <Select
          value={state.mode}
          onChange={handleModeChange}
          sx={{ color: colors.grey[100], marginRight: "16px" }}
        >
          <MenuItem value="DEMO_MODE">Demo Mode</MenuItem>
          <MenuItem value="DEV_MODE">Dev Mode</MenuItem>
          <MenuItem value="LIVE_MODE">Live Mode</MenuItem>
        </Select>

        {/* Light/Dark Mode Toggle */}
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