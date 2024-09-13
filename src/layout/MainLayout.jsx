import React, { useState } from "react";
import { Box, useTheme } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

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

        {/* Main content area (scrollable if content overflows) */}
        <Box
          sx={{
            flexGrow: 1, // This will make the content area take the remaining space
            padding: "16px",
            transition: "flex-grow 0.3s", // Optional smooth transition
            backgroundColor: theme.palette.background.default,
            borderTopLeftRadius: "1.5%", // Border radius for top left corner
            borderTopRightRadius: "1.5%", // Border radius for top right corner
            margin: "0", // Set all margins to 0
            marginTop: "0rem",
            marginRight: "1rem", // Set right margin to 1rem
            height: "calc(100vh - 64px)", // Full height minus header
            overflowY: "auto", // Enable vertical scrolling if content overflows
          }}
        >
          {/* Content */}
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default MainLayout;