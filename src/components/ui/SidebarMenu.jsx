import { useState, useEffect } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, useTheme } from "@mui/material";
import { Link, useLocation } from "react-router-dom"; 
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ApartmentOutlinedIcon from "@mui/icons-material/ApartmentOutlined";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import ScienceOutlinedIcon from "@mui/icons-material/ScienceOutlined"; // Flask icon
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined"; // Not found icon
import { tokens } from "../../theme";

const SidebarMenu = ({ collapsed }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const location = useLocation(); 
  
  const [selected, setSelected] = useState("Dashboard");

  useEffect(() => {
    switch (location.pathname) {
      case "/":
        setSelected("Home");
        break;
      case "/load-center":
        setSelected("Load Center");
        break;
      case "/dashboard":
        setSelected("Dashboard");
        break;
      case "/downloads":
        setSelected("Downloads");
        break;
      case "/users":
        setSelected("Manage Users");
        break;
      case "/users-new":
        setSelected("New User");
        break;
      case "/calendar":
        setSelected("Calendar");
        break;
      case "/faq":
        setSelected("FAQ");
        break;
      case "/mui-components-test":
        setSelected("Test Page");
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
          {/* Home */}
          <MenuItem
            icon={<HomeOutlinedIcon />}
            active={selected === "Home"}
            component={<Link to="/" />}
            rootStyles={getMenuItemStyles(selected === "Home")}
          >
            Home
          </MenuItem>

          {/* Load Center */}
          <MenuItem
            icon={<ApartmentOutlinedIcon />}
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

          {/* Downloads */}
          <MenuItem
            icon={<DownloadOutlinedIcon />}
            active={selected === "Downloads"}
            component={<Link to="/downloads" />}
            rootStyles={getMenuItemStyles(selected === "Downloads")}
          >
            Downloads
          </MenuItem>

          {/* Manage Users */}
          <MenuItem
            icon={<PeopleOutlinedIcon />}
            active={selected === "Manage Users"}
            component={<Link to="/users" />}
            rootStyles={getMenuItemStyles(selected === "Manage Users")}
          >
            Manage Users
          </MenuItem>

          {/* New User */}
          <MenuItem
            icon={<PersonOutlinedIcon />}
            active={selected === "New User"}
            component={<Link to="/users-new" />}
            rootStyles={getMenuItemStyles(selected === "New User")}
          >
            New User
          </MenuItem>

          {/* Calendar */}
          <MenuItem
            icon={<CalendarTodayOutlinedIcon />}
            active={selected === "Calendar"}
            component={<Link to="/calendar" />}
            rootStyles={getMenuItemStyles(selected === "Calendar")}
          >
            Calendar
          </MenuItem>

          {/* FAQ */}
          <MenuItem
            icon={<HelpOutlineOutlinedIcon />}
            active={selected === "FAQ"}
            component={<Link to="/faq" />}
            rootStyles={getMenuItemStyles(selected === "FAQ")}
          >
            FAQ
          </MenuItem>

          {/* Test Page */}
          <MenuItem
            icon={<ScienceOutlinedIcon />}
            active={selected === "Test Page"}
            component={<Link to="/mui-components-test" />}
            rootStyles={getMenuItemStyles(selected === "Test Page")}
          >
            Test Page
          </MenuItem>

          {/* Not Found Page */}
          <MenuItem
            icon={<ErrorOutlineOutlinedIcon />}
            active={selected === "Not Found"}
            component={<Link to="*" />}
            rootStyles={getMenuItemStyles(selected === "Not Found")}
          >
            Not Found
          </MenuItem>
        </Menu>
      </Sidebar>
    </Box>
  );
};

export default SidebarMenu;