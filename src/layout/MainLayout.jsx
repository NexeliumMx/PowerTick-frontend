import React, { useState } from "react";
import { Box, Container, Typography, useTheme } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import BreakpointChecker from '../components/BreakpointChecker';

const MainLayout = () => {
  const theme = useTheme();
  const [isCollapsed, setIsCollapsed] = useState(false); // Track whether the sidebar is collapsed

  const handleDrawerToggle = () => {
    setIsCollapsed(!isCollapsed); // Toggle the collapsed state
  };

  return (
    <Box
      sx={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        flexDirection: "column",
        backgroundColor: theme.palette.background.paper,
      }}
    >
      {/* Header */}
      <Box sx={{ width: "100%", position: "fixed", top: 0, zIndex: 1200 }}>
        <Header handleDrawerToggle={handleDrawerToggle} />
      </Box>

      <Box sx={{ display: "flex", flexGrow: 1, marginTop: "64px" }}>
        {/* Sidebar */}
        <Box
          sx={{
            width: isCollapsed ? 80 : 240, // Adjust width of the sidebar based on collapse state
            transition: "width 0.3s", // Smooth transition for collapse/expand
            height: "100%",
          }}
        >
          <Sidebar isCollapsed={isCollapsed} />
        </Box>

        {/* Main content area (scrollable) */}
        <Box
          sx={{
            flexGrow: 1, // This will make the content area take the remaining space
            transition: "flex-grow 0.3s", // Optional smooth transition
            backgroundColor: theme.palette.background.default,
            borderTopLeftRadius: "1.5%", // Border radius for top left corner
            borderTopRightRadius: "1.5%", // Border radius for top right corner
            margin: "0", // Set all margins to 0
            marginTop: "0rem",
            marginRight: "1rem", // Set right margin to 1rem
            height: "calc(100vh - 64px)", // Full height minus header
            overflowY: "auto", // Enable vertical scrolling if content overflows
            zIndex: 1100, // Make sure content box is below the header
          }}
        >
          <Container
            maxWidth="xl"
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "calc(100vh - 64px)", // Ensure the container fills the available space
              //backgroundColor: 'blue',
            }}
          >
            <Typography
              variant="h1"
              align="center" // Center the title
              sx={{
                fontSize: {
                  xs: "1.5rem", // Extra-small screens
                  sm: "2rem", // Small screens
                  md: "2.5rem", // Medium screens
                  lg: "3.5rem", // Large screens
                  xl: "4.5rem", // Extra-large screens
                },
                marginBottom: {
                  xs: "12px", // Extra-small screens
                  sm: "16px", // Small screens
                  md: "24px", // Medium screens
                  lg: "32px", // Large screens
                  xl: "40px", // Extra-large screens
                },
              }}
            >
              Container for content outlet & H1 title
            </Typography>
            <Outlet />
            <BreakpointChecker/>
          </Container>
        </Box>
      </Box>
    </Box>
  );
};

export default MainLayout;
