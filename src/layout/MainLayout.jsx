/**
 * File: src/layout/MainLayout.jsx
 * Author(s): Arturo Vargas
 * Brief: Main layout component for the PowerTick React application.
 * Date: 2024-xx-xx
 *
 * Description:
 * This file defines the main layout structure for PowerTick, including the 
 * top navigation bar, sidebar menu, and content area. It integrates authentication 
 * via Azure AD B2C using MSAL and displays user information after login. 
 * A sign-out button allows users to log out and redirects them to the home page.
 *
 * Copyright (c) 2025 BY: Nexelium Technological Solutions S.A. de C.V.
 * All rights reserved.
 *
 * Version History:
 * - 2024-xx-xx: Initial file creation.
 * - 2025-02-12: Integrated MSAL authentication for user info display.
 * - 2025-02-13: Implemented sign-out functionality with redirection to home page.
 */

import { useState, useContext } from "react";
import {
  Box,
  useMediaQuery,
  useTheme,
  Button,
  Typography,
} from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import { useMsal } from "@azure/msal-react";
import Topbar from "../components/ui/Topbar";
import SidebarMenu from "../components/ui/SidebarMenu";
import SmallScreenSidebarMenu from "../components/ui/SmallScreenSidebarMenu";
import BreakpointChecker from "../components/BreakpointChecker";
import Footer from "../components/ui/Footer";
import { ModeContext } from "../context/AppModeContext";

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { state } = useContext(ModeContext);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { instance, accounts } = useMsal();
  const navigate = useNavigate(); // Use React Router for redirection

  const handleLogout = () => {
    instance.logoutPopup().then(() => {
      navigate("/"); // Redirect to Home Page after logout
    });
  };

  const handleDrawerToggle = () => {
    if (isSmallScreen) {
      setDrawerOpen(true);
    } else {
      setCollapsed(!collapsed);
    }
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      {/* Topbar */}
      <Box sx={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 2 }}>
        <Topbar handleDrawerToggle={handleDrawerToggle} />
      </Box>

      {/* Sidebar and Content */}
      <Box display="flex" flexGrow={1} marginTop="64px">
        {!isSmallScreen ? (
          <Box
            sx={{
              position: "fixed",
              top: "64px",
              left: 0,
              bottom: 0,
              width: collapsed ? "80px" : "250px",
              transition: "width 0.2s ease",
              zIndex: 1,
            }}
          >
            <SidebarMenu collapsed={collapsed} />
          </Box>
        ) : (
          <SmallScreenSidebarMenu
            isOpen={drawerOpen}
            toggleDrawer={toggleDrawer}
          />
        )}

        {/* Content */}
        <Box
          sx={{
            flexGrow: 1,
            marginLeft: !isSmallScreen ? (collapsed ? "80px" : "250px") : "0px",
            transition: "margin-left 0.2s ease",
            padding: "0",
            overflowY: "auto",
          }}
        >
          <Box
            sx={{
              maxWidth: "1400px",
              margin: "0 auto",
              padding: isSmallScreen ? "0 16px" : "0",
            }}
          >
            {/* User Info & Logout Button */}
            <Box sx={{ padding: 2, textAlign: "center", width: "100%" }}>
              {accounts.length > 0 && (
                <>
                  <Typography variant="h6">
                    Hello, {accounts[0].name}!
                  </Typography>
                  <Typography variant="body2">
                    Email: {accounts[0].username}
                  </Typography>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleLogout}
                    sx={{ marginTop: 2 }}
                  >
                    Sign Out
                  </Button>
                </>
              )}
            </Box>

            <Outlet />
            <BreakpointChecker />
          </Box>
          <Box sx={{ width: "100%", bottom: 0, zIndex: 2 }}>
            <Footer />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default MainLayout;