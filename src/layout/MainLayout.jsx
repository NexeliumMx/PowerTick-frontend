import { useState, useContext } from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { Outlet } from "react-router-dom";
import Topbar from "../components/ui/Topbar";
import SidebarMenu from "../components/ui/SidebarMenu";
import SmallScreenSidebarMenu from "../components/ui/SmallScreenSidebarMenu";
import BreakpointChecker from "../components/BreakpointChecker";
import Footer from "../components/ui/Footer";
import { ModeContext } from "../context/AppModeContext";

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false); // Controls sidebar collapse in large screens
  const [drawerOpen, setDrawerOpen] = useState(false); // Controls drawer in small screens
  const { state } = useContext(ModeContext); 
  const theme = useTheme();
  
  // Detect if the screen is small or extra small
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleDrawerToggle = () => {
    if (isSmallScreen) {
      setDrawerOpen(true); // Opens the drawer in small screens
    } else {
      setCollapsed(!collapsed); // Toggles the sidebar collapse in larger screens
    }
  };

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
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
          // Sidebar for larger screens
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
          // Drawer Menu for small screens
          <SmallScreenSidebarMenu isOpen={drawerOpen} toggleDrawer={toggleDrawer} />
        )}

        {/* Content */}
        <Box
          sx={{
            flexGrow: 1,
            marginLeft: !isSmallScreen ? (collapsed ? "80px" : "250px") : "0px", // Remove margin on small screens
            transition: "margin-left 0.2s ease",
            padding: "0",
            overflowY: "auto",
          }}
        >
          <Box
            sx={{
              maxWidth: "1400px",
              margin: "0 auto",
              padding: isSmallScreen ? "0 16px" : "0", // Optional padding for small screens
            }}
          >
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
