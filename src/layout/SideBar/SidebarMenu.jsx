import { useState, useEffect } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, useTheme, Typography } from "@mui/material";
import { Link, useLocation } from "react-router-dom"; 
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import ElectricMeterOutlinedIcon from '@mui/icons-material/ElectricMeterOutlined';
import EventNote from "@mui/icons-material/EventNote";
import { tokens } from "../../theme";

const SidebarMenu = ({ collapsed }) => {
  const theme = useTheme();
  const colors = tokens;
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
    <Box sx={{ display: "flex", height: "100%", minHeight:0 }}>
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
            icon={<ElectricMeterOutlinedIcon sx={{ fontSize: 26 }} />}
            active={selected === "Load Center"}
            component={<Link to="/load-center" />}
            rootStyles={getMenuItemStyles(selected === "Load Center")}
          >
            <Typography variant="h5" fontWeight={600}>
            Centros de Carga
            </Typography>
          </MenuItem>

          {/* Dashboard */}
          <MenuItem
            icon={<DashboardOutlinedIcon sx={{ fontSize: 26 }}/>} 
            active={selected === "Dashboard"}
            component={<Link to="/dashboard" />}
            rootStyles={getMenuItemStyles(selected === "Dashboard")}
          >
            <Typography variant="h5" fontWeight={600}>
            Dashboard
            </Typography>
          </MenuItem>

          {/* Downloads */}
          <MenuItem
            icon={<EventNote sx={{ fontSize: 26 }}/>} 
            active={selected === "Monthly Reports"}
            component={<Link to="/downloads" />}
            rootStyles={getMenuItemStyles(selected === "Monthly Reports")}
          >
            <Typography variant="h5" fontWeight={600}>
            Monthly Reports
            </Typography>
          </MenuItem>
        </Menu>
      </Sidebar>
    </Box>
  );
};

export default SidebarMenu;