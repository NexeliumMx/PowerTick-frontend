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
  Button,
} from "@mui/material";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { Icon } from '@iconify/react';
import { useTranslation } from 'react-i18next';
import LanguageIcon from '@mui/icons-material/Language';
import { useMsal } from "@azure/msal-react";

const Topbar = ({ handleDrawerToggle }) => {
  const theme = useTheme();
  const colors = tokens;
  const colorMode = useContext(ColorModeContext);
  const { state, dispatch } = useContext(ModeContext);
  const { i18n, t } = useTranslation();
  const { instance } = useMsal();

  // Detect small screens (sm and xs)
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleModeChange = (event) => {
    const selectedMode = event.target.value;
    dispatch({ type: `SET_${selectedMode}` });
  };

  const handleLanguageToggle = () => {
    const newLang = i18n.language === 'en' ? 'es' : 'en';
    i18n.changeLanguage(newLang);
    // Force rerender to update UI after language change
    window.location.reload();
  };

  const getFlagCode = (lang) => lang === 'es' ? 'MX' : 'US';

  const handleLogout = () => {
    instance.logoutRedirect();
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
            width: isSmallScreen ? "0px" : "180px",
            height: "45px",
            overflow: "visible",
            transition: "width 0.3s ease, opacity 0.3s ease",
            opacity: isSmallScreen ? 0 : 1,
            visibility: isSmallScreen ? "hidden" : "visible",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: "45px",
              height: "45px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Logo */}
          <img
            src="/assets/logo_powertick-02.svg"
            alt="Logo"
            style={{
              width: "250%",
              height: "250%",
              cursor: "pointer",
              filter: theme.palette.mode=== "dark"? "brightness(0) invert(1)": "brightness(0)", // Makes logo white
            }}
          />
          </Box>
          {!isSmallScreen && (
            <Box sx={{ ml: 1, mr: 1, display: "flex", alignItems: "center" }}>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 700,
                  color: theme.palette.text.primary,
                  letterSpacing: "0.05em",
                  marginLeft: "15px",
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
      {/*
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
      */}

      {/* Right Section */}
<Box sx={{ display: "flex", alignItems: "center" }}>
        {/* Mode Switcher */}
        {!isSmallScreen && (
          <Select
            value={state.mode}
            onChange={handleModeChange}
            sx={{ color: theme.palette.text.primary, marginRight: "16px" }}
          >
            <MenuItem value="DEMO">Demo</MenuItem>
            <MenuItem value="DEV">Dev</MenuItem>
            <MenuItem value="PRODUCTION">Production</MenuItem>
          </Select>
        )}

        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>

        <IconButton onClick={handleLanguageToggle} title={t('button.spanish')}>
          <Icon icon={getFlagCode(i18n.language) === 'MX' ? "twemoji:flag-for-mexico" : "twemoji:flag-for-united-states"} width="32" height="32" style={{ marginRight: 4 }} />
        </IconButton>

        <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton>
          <SettingsOutlinedIcon />
        </IconButton>
        <Button
          variant="outlined"
          sx={{
            color: '#fff',
            borderColor: '#fff',
            '&:hover': {
              borderColor: '#fff',
            },
            ml: 2,
          }}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Box>
    </Box>
  );
};

export default Topbar;
