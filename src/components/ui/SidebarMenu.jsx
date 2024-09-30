import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { useState } from "react";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";

const SidebarMenu = () => {
  const theme = useTheme();
  const [collapsed, setCollapsed] = useState(false); // State to manage collapse
  const [selected, setSelected] = useState("Dashboard");

  const handleCollapseToggle = () => {
    setCollapsed((prevCollapsed) => !prevCollapsed);
  };

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      {/* Sidebar with collapse toggle */}
      <Sidebar collapsed={collapsed}>
        <Menu>
          {/* Toggle button for collapse/expand */}
          <MenuItem
            onClick={handleCollapseToggle}
            icon={collapsed ? <MenuOutlinedIcon /> : undefined}
            style={{ margin: "10px 0 20px 0" }}
          >
            {!collapsed && (
              <Box display="flex" justifyContent="space-between" alignItems="center" ml="15px">
                <Typography variant="h3">ADMINIS</Typography>
                <IconButton onClick={handleCollapseToggle}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {/* Menu Items */}
          <MenuItem
            icon={<HomeOutlinedIcon />}
            active={selected === "Dashboard"}
            onClick={() => setSelected("Dashboard")}
          >
            Dashboard
          </MenuItem>
          <MenuItem
            icon={<PeopleOutlinedIcon />}
            active={selected === "Manage Team"}
            onClick={() => setSelected("Manage Team")}
          >
            Manage Team
          </MenuItem>
          <MenuItem
            icon={<ContactsOutlinedIcon />}
            active={selected === "Contacts"}
            onClick={() => setSelected("Contacts")}
          >
            Contacts Information
          </MenuItem>
          <MenuItem
            icon={<ReceiptOutlinedIcon />}
            active={selected === "Invoices"}
            onClick={() => setSelected("Invoices")}
          >
            Invoices Balances
          </MenuItem>
          <MenuItem
            icon={<PersonOutlinedIcon />}
            active={selected === "Profile"}
            onClick={() => setSelected("Profile")}
          >
            Profile Form
          </MenuItem>
          <MenuItem
            icon={<CalendarTodayOutlinedIcon />}
            active={selected === "Calendar"}
            onClick={() => setSelected("Calendar")}
          >
            Calendar
          </MenuItem>
          <MenuItem
            icon={<HelpOutlineOutlinedIcon />}
            active={selected === "FAQ"}
            onClick={() => setSelected("FAQ")}
          >
            FAQ Page
          </MenuItem>
          <MenuItem
            icon={<BarChartOutlinedIcon />}
            active={selected === "BarChart"}
            onClick={() => setSelected("BarChart")}
          >
            Bar Chart
          </MenuItem>
          <MenuItem
            icon={<PieChartOutlineOutlinedIcon />}
            active={selected === "PieChart"}
            onClick={() => setSelected("PieChart")}
          >
            Pie Chart
          </MenuItem>
          <MenuItem
            icon={<TimelineOutlinedIcon />}
            active={selected === "LineChart"}
            onClick={() => setSelected("LineChart")}
          >
            Line Chart
          </MenuItem>
          <MenuItem
            icon={<MapOutlinedIcon />}
            active={selected === "GeographyChart"}
            onClick={() => setSelected("GeographyChart")}
          >
            Geography Chart
          </MenuItem>
        </Menu>
      </Sidebar>
    </Box>
  );
};

export default SidebarMenu;