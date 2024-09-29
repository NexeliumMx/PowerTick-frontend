import { useState } from "react";
import { Box, Container, useTheme } from "@mui/material";
import { Outlet } from "react-router-dom";
import Topbar from "../components/ui/Topbar";
import SidebarMenu from "../components/ui/SidebarMenu";
import BreakpointChecker from "../components/BreakpointChecker";

const MainLayout = () => {
  const theme = useTheme();
  const [isCollapsed, setIsCollapsed] = useState(false); // Track whether the sidebar is collapsed

  const handleDrawerToggle = () => {
    setIsCollapsed(!isCollapsed); // Toggle the collapsed state
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      {/* Topbar */}
      <Box sx={{ width: "100%", position: "fixed", top: 0, zIndex: 1000 }}>
        <Topbar handleDrawerToggle={handleDrawerToggle} />
      </Box>

      {/* Sidebar and Content */}
      <Box sx={{ display: "flex", flexGrow: 1, marginTop: "64px" }}> {/* Adjust margin to account for Topbar height */}
        {/* Sidebar */}
        <Box sx={{ width: isCollapsed ? "80px" : "250px", transition: "width 0.3s ease-in-out" }}>
          <SidebarMenu isCollapsed={isCollapsed} />
        </Box>

        {/* Main content area */}
        <Box sx={{ flexGrow: 1, padding: "20px" }}>
          <Outlet />
          <BreakpointChecker />
        </Box>
      </Box>
    </Box>
  );
};

export default MainLayout;