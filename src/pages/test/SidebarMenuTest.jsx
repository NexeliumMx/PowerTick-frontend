import { useState } from "react";
import { Box } from "@mui/material";
import SidebarMenu from "../../components/ui/SidebarMenu";
import Topbar from "../../components/ui/Topbar";
import MUIComponentsTest from "./MUIComponentsTest";

const SidebarMenuTest = () => {
  const [collapsed, setCollapsed] = useState(false);

  const handleDrawerToggle = () => {
    setCollapsed((prevCollapsed) => !prevCollapsed);
  };

  return (
    <Box display="flex" flexDirection="column" height="100vh" overflow="auto">
      <Box sx={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 2 }}>
        <Topbar handleDrawerToggle={handleDrawerToggle} />
      </Box>

      <Box display="flex" flexGrow={1} height="100%" marginTop="64px">
        <Box sx={{ position: "fixed", top: "64px", left: 0, height: "calc(100vh - 64px)", zIndex: 1 }}>
          <SidebarMenu collapsed={collapsed} />
        </Box>

        <Box
          sx={{
            flexGrow: 1,
            backgroundColor: "blue",
            height: "calc(100vh - 64px)",
            marginLeft: collapsed ? "80px" : "250px",
            padding: "10px",
            zIndex: 0,
            borderRadius: "10px",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              paddingLeft: "50px",
              paddingRight: "50px",
              maxWidth: "1400px",
              margin: "0 auto",
            }}
          >
            <MUIComponentsTest />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SidebarMenuTest;