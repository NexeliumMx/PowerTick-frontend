import { useState } from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Topbar from "../components/ui/Topbar";
import SidebarMenu from "../components/ui/SidebarMenu";
import BreakpointChecker from "../components/BreakpointChecker";

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  const handleDrawerToggle = () => {
    setCollapsed((prevCollapsed) => !prevCollapsed);
  };

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      {/* Topbar */}
      <Box sx={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 2 }}>
        <Topbar handleDrawerToggle={handleDrawerToggle} />
      </Box>

      {/* Sidebar and Content */}
      <Box display="flex" flexGrow={1} marginTop="64px">
        {/* Sidebar */}
        <Box
          sx={{
            position: "fixed",
            top: "64px",
            left: 0,
            bottom: 0,
            width: collapsed ? "80px" : "250px",
            transition: "width 0.2s ease", // Faster transition
            zIndex: 1,
          }}
        >
          <SidebarMenu collapsed={collapsed} />
        </Box>

        {/* Content */}
        <Box
          sx={{
            flexGrow: 1,
            marginLeft: collapsed ? "80px" : "250px",
            transition: "margin-left 0.2s ease", // Faster transition
            padding: "20px",
            overflowY: "auto", // Enable vertical scrolling
          }}
        >
          <Box
            sx={{
              maxWidth: "1400px",
              margin: "0 auto",
            }}
          >
            <Outlet />
            <BreakpointChecker />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default MainLayout;