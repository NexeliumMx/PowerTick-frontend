import { useState, useEffect } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, useTheme } from "@mui/material";
import { Link, useLocation } from "react-router-dom"; 
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import ElectricMeterOutlinedIcon from '@mui/icons-material/ElectricMeterOutlined';
import ScienceIcon from '@mui/icons-material/Science';
import { tokens } from "../../theme";

const SidebarMenu = ({ collapsed }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const location = useLocation(); 
  
  const [selected, setSelected] = useState("Dashboard");

  useEffect(() => {
    switch (location.pathname) {
      case "/load-center":
        setSelected("Load Center");
        break;
      case "/dashboard":
        setSelected("Dashboard");
        break;
      case "/user-manual":
        setSelected("User Manual");
        break;
      case "/mui-components-test":
        setSelected("Test Page");
        break;
      case "/sidebar-menu-test":
        setSelected("Sidebar Menu Test");
        break;
      default:
        setSelected("");
    }
  }, [location]); 

  const getMenuItemStyles = (isSelected) => ({
    backgroundColor: isSelected ? theme.palette.background.default : "inherit",
    color: isSelected ? theme.palette.primary : theme.palette.text.secondary,
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
      color: theme.palette.primary.contrastText,
    },
  });

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Sidebar
        collapsed={collapsed}
        backgroundColor={theme.palette.background.paper}
        rootStyles={{
          border: "none",
          padding: 0,
          margin: 0,
        }}
      >
        <Menu>
          {/* Load Center */}
          <MenuItem
            icon={<ElectricMeterOutlinedIcon />}
            active={selected === "Load Center"}
            component={<Link to="/load-center" />}
            rootStyles={getMenuItemStyles(selected === "Load Center")}
          >
            Load Center
          </MenuItem>

          {/* Dashboard */}
          <MenuItem
            icon={<DashboardOutlinedIcon />}
            active={selected === "Dashboard"}
            component={<Link to="/dashboard" />}
            rootStyles={getMenuItemStyles(selected === "Dashboard")}
          >
            Dashboard
          </MenuItem>

          {/* User Manual */}
          <MenuItem
            icon={<ScienceIcon />}
            active={selected === "User Manual"}
            component={<Link to="/user-manual" />}
            rootStyles={getMenuItemStyles(selected === "User Manual")}
          >
            User Manual
          </MenuItem>

          {/* Test Page */}
          <MenuItem
            icon={<ScienceIcon />}
            active={selected === "Test Page"}
            component={<Link to="/mui-components-test" />}
            rootStyles={getMenuItemStyles(selected === "Test Page")}
          >
            Test Page
          </MenuItem>

          {/* Sidebar Menu Test */}
          <MenuItem
            icon={<ScienceIcon />}
            active={selected === "Sidebar Menu Test"}
            component={<Link to="/sidebar-menu-test" />}
            rootStyles={getMenuItemStyles(selected === "Sidebar Menu Test")}
          >
            Sidebar Menu Test
          </MenuItem>
        </Menu>
      </Sidebar>
    </Box>
  );
};

export default SidebarMenu;