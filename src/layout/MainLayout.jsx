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
 * - 2025-02-17: display all the user attributes that are returned in the authentication token.
 */

import { useState, useContext, useEffect } from "react";
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
import BreakpointChecker from "../components/test/BreakpointChecker";
import Footer from "../components/ui/Footer";
import { ModeContext } from "../context/AppModeContext";

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { state } = useContext(ModeContext);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { instance, accounts } = useMsal();
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (accounts.length > 0) {
      const account = accounts[0];

      instance
        .acquireTokenSilent({
          scopes: ["openid", "profile", "email"],
          account: account,
        })
        .then((response) => {
          const claims = response.idTokenClaims;
          setUserInfo({
            name: claims.name || "N/A",
            email: claims.emails?.[0] || claims.email || "N/A",
            city: claims.city || "N/A",
            country: claims.country || "N/A",
            jobTitle: claims.jobTitle || "N/A",
            postalCode: claims.postalCode || "N/A",
            state: claims.state || "N/A",
            street: claims.streetAddress || "N/A",
            surname: claims.surname || "N/A",
            objectId: claims.oid || "N/A",
          });
        })
        .catch((error) => console.error("Error fetching token claims:", error));
    }
  }, [accounts, instance]);

  const handleLogout = () => {
    instance.logoutRedirect();
  };

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      {/* Topbar */}
      <Box sx={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 2 }}>
        <Topbar handleDrawerToggle={() =>  {
    if (isSmallScreen) {
      setDrawerOpen(true); // abrir el drawer temporal
    } else {
      setCollapsed((prev) => !prev); // colapsar el drawer permanente
    }
  }} />
      </Box>

      {/* Sidebar and Content */}
      <Box display="flex" flexGrow={1} marginTop="64px">
        {!isSmallScreen ? (
          <Box
            sx={{
              position: "fixed",
              top: "85px",
              left: 0,
              bottom: 0,
              width: collapsed ? "80px" : "250px",
              transition:  "margin-left 0.3s ease-in-out",
              zIndex: theme.zIndex.appBar - 1,
            }}
          >
            <SidebarMenu collapsed={collapsed} />
          </Box>
        ) : (
          <SmallScreenSidebarMenu isOpen={drawerOpen} toggleDrawer={() => setDrawerOpen(false)} />
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
          {/* User Info & Logout Button */}
          <Box sx={{ padding: 2, textAlign: "center", width: "100%" }}>
            {userInfo && (
              <>
                <Typography variant="h6">Hello, {userInfo.name}!</Typography>
                <Typography variant="body2">Email: {userInfo.email}</Typography>
                <Typography variant="body2">City: {userInfo.city}</Typography>
                <Typography variant="body2">Country: {userInfo.country}</Typography>
                <Typography variant="body2">Job Title: {userInfo.jobTitle}</Typography>
                <Typography variant="body2">Postal Code: {userInfo.postalCode}</Typography>
                <Typography variant="body2">State: {userInfo.state}</Typography>
                <Typography variant="body2">Street: {userInfo.street}</Typography>
                <Typography variant="body2">Surname: {userInfo.surname}</Typography>
                <Typography variant="body2">User ID: {userInfo.objectId}</Typography>

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
          <Footer />
        </Box>
      </Box>
    </Box>
  );
};

export default MainLayout;