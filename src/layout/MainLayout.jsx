import { useState, useContext } from "react";
import { Box, useTheme } from "@mui/material";
import { Outlet } from "react-router-dom";
import Topbar from "../components/ui/Topbar";
import SidebarMenu from "../components/ui/SidebarMenu";
import BreakpointChecker from "../components/BreakpointChecker";
import Footer from "../components/ui/Footer";
import { ColorModeContext, tokens } from "../theme"; // Import necessary theme context and tokens

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  // Using MUI Theme and ColorModeContext
  const theme = useTheme();
  const colors = tokens(theme.palette.mode); // Get tokens based on the current theme mode
  const colorMode = useContext(ColorModeContext); // For switching color modes if needed

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
      <Box
        display="flex"
        flexGrow={1}
        marginTop="64px"
        sx={{ backgroundColor: theme.palette.background.paper }} // Using theme color for background
      >
        {/* Sidebar */}
        <Box
          sx={{
            position: "fixed",
            top: "64px",
            left: 0,
            bottom: 0,
            width: collapsed ? "80px" : "250px", // Sidebar width changes based on collapsed state
            transition: "width 0.3s ease",
            zIndex: 1, // Lower z-index to allow footer overlap
            backgroundColor: colors.primary[700], // Using tokens for sidebar background color
            boxShadow: "2px 0px 5px rgba(0, 0, 0, 0.1)",
          }}
        >
          <SidebarMenu collapsed={collapsed} />
        </Box>

        {/* Content */}
        <Box
          sx={{
            flexGrow: 1,
            marginLeft: collapsed ? "80px" : "250px",
            transition: "margin-left 0.3s ease",
            padding: "20px",
            overflowY: "auto",
            backgroundColor: theme.palette.background.paper, // Using theme color for content background
          }}
        >
          <Box
            sx={{
              maxWidth: "1400px",
              margin: "0 auto",
              paddingBottom: "20px", // To avoid overlap with the footer
              color: theme.palette.text.primary, // Use theme color for text
            }}
          >
            <Outlet />
            <BreakpointChecker />
          </Box>
        </Box>
      </Box>

      {/* Footer - Dynamically adjusted width based on sidebar state */}
      <Box
        sx={{
          position: "relative", // Fixes the footer at the bottom of the screen
          bottom: 0,
          left: collapsed ? "80px" : "250px", // Adjust left position based on sidebar
          width: `calc(100% - ${collapsed ? "80px" : "250px"})`, // Adjust width dynamically based on sidebar
          transition: "left 0.3s ease, width 0.3s ease", // Smooth transitions for both left and width
          height: "50px", // Set the reduced height for the footer
          zIndex: 2, // Higher z-index to overlap the sidebar
          backgroundColor: colors.primary[700], // Using tokens for footer background color
          color: theme.palette.text.primary, // Footer text color using theme palette
        }}
      >
        <Footer />
      </Box>
    </Box>
  );
};

export default MainLayout;
