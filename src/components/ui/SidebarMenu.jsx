import { useState, useEffect, useContext } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, useTheme } from "@mui/material";
import { Link, useLocation } from "react-router-dom"; // Import useLocation to track current path
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ApartmentOutlinedIcon from "@mui/icons-material/ApartmentOutlined";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import { ColorModeContext, tokens } from "../../theme";

const SidebarMenu = ({ collapsed }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const location = useLocation(); // Hook to get current location (route)
  
  const [selected, setSelected] = useState("Dashboard");

  // Update the selected state based on the current URL path
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
      case "/users":
        setSelected("Manage Users");
        break;
      case "/downloads":
        setSelected("Downloads");
        break;
      case "/invoices":
        setSelected("Invoices");
        break;
      case "/profile":
        setSelected("Profile");
        break;
      case "/calendar":
        setSelected("Calendar");
        break;
      case "/faq":
        setSelected("FAQ");
        break;
      case "/bar":
        setSelected("BarChart");
        break;
      case "/pie":
        setSelected("PieChart");
        break;
      case "/line":
        setSelected("LineChart");
        break;
      case "/geography":
        setSelected("GeographyChart");
        break;
      default:
        setSelected("");
    }
  }, [location]); // Trigger effect when location changes

  // Dynamic styles based on active item
  const getMenuItemStyles = (isSelected) => ({
    backgroundColor: isSelected ? theme.palette.background.default : "inherit",
    color: isSelected ? theme.palette.primary : theme.palette.text.secondary,
    borderRadius: "5px",
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

          {/* Manage Users */}
          <MenuItem
            icon={<PeopleOutlinedIcon />}
            active={selected === "Manage Users"}
            component={<Link to="/users" />}
            rootStyles={getMenuItemStyles(selected === "Manage Users")}
          >
            Manage Users
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

          {/* Invoices Balances */}
          <MenuItem
            icon={<ReceiptOutlinedIcon />}
            active={selected === "Invoices"}
            component={<Link to="/invoices" />}
            rootStyles={getMenuItemStyles(selected === "Invoices")}
          >
            Invoices Balances
          </MenuItem>

          {/* Profile Form */}
          <MenuItem
            icon={<PersonOutlinedIcon />}
            active={selected === "Profile"}
            component={<Link to="/profile" />}
            rootStyles={getMenuItemStyles(selected === "Profile")}
          >
            Profile Form
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

          {/* FAQ Page */}
          <MenuItem
            icon={<HelpOutlineOutlinedIcon />}
            active={selected === "FAQ"}
            component={<Link to="/faq" />}
            rootStyles={getMenuItemStyles(selected === "FAQ")}
          >
            FAQ Page
          </MenuItem>

          {/* Bar Chart */}
          <MenuItem
            icon={<BarChartOutlinedIcon />}
            active={selected === "BarChart"}
            component={<Link to="/bar" />}
            rootStyles={getMenuItemStyles(selected === "BarChart")}
          >
            Bar Chart
          </MenuItem>

          {/* Pie Chart */}
          <MenuItem
            icon={<PieChartOutlineOutlinedIcon />}
            active={selected === "PieChart"}
            component={<Link to="/pie" />}
            rootStyles={getMenuItemStyles(selected === "PieChart")}
          >
            Pie Chart
          </MenuItem>

          {/* Line Chart */}
          <MenuItem
            icon={<TimelineOutlinedIcon />}
            active={selected === "LineChart"}
            component={<Link to="/line" />}
            rootStyles={getMenuItemStyles(selected === "LineChart")}
          >
            Line Chart
          </MenuItem>

          {/* Geography Chart */}
          <MenuItem
            icon={<MapOutlinedIcon />}
            active={selected === "GeographyChart"}
            component={<Link to="/geography" />}
            rootStyles={getMenuItemStyles(selected === "GeographyChart")}
          >
            Geography Chart
          </MenuItem>
        </Menu>
      </Sidebar>
    </Box>
  );
};

export default SidebarMenu;