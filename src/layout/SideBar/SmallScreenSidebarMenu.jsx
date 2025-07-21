import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  Box,
} from "@mui/material";
import { Link as RouterLink, useLocation } from "react-router-dom";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import ElectricMeterOutlinedIcon from "@mui/icons-material/ElectricMeterOutlined";
import ScienceOutlinedIcon from "@mui/icons-material/ScienceOutlined";

const SmallScreenSidebarMenu = ({ isOpen, toggleDrawer }) => {
  const theme = useTheme();
  const location = useLocation();

  const menuItems = [
    { label: "Load Center", icon: <ElectricMeterOutlinedIcon />, path: "/load-center" },
    { label: "Dashboard", icon: <DashboardOutlinedIcon />, path: "/dashboard" },
    { label: "User Manual", icon: <ScienceOutlinedIcon />, path: "/user-manual" },
    { label: "Test Page", icon: <ScienceOutlinedIcon />, path: "/mui-components-test" },
    { label: "Sidebar Menu Test", icon: <ScienceOutlinedIcon />, path: "/sidebar-menu-test" },
  ];

  const selectedRoute = (path) => location.pathname === path;

  return (
    <Drawer
      anchor="left"
      open={isOpen}
      onClose={toggleDrawer}
      variant="temporary"
      ModalProps={{ keepMounted: true }}
      PaperProps={{
        sx: {
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
          width: 250,
        },
      }}
    >
      <Box
        role="presentation"
        onClick={toggleDrawer}
        onKeyDown={(e) => {
          if (e.key === "Escape") toggleDrawer();
        }}
      >
        <List>
          {menuItems.map((item) => (
           <ListItem
           key={item.label}
           component={RouterLink}
           to={item.path}
           sx={{
             backgroundColor: selectedRoute(item.path) ? theme.palette.primary.main : "inherit",
             color: selectedRoute(item.path)
               ? theme.palette.primary.contrastText
               : theme.palette.text.secondary,
             "&:hover": {
               backgroundColor: theme.palette.primary.dark,
               color: theme.palette.primary.contrastText,
             },
           }}
         >
           <ListItemIcon
             sx={{
               color: selectedRoute(item.path)
                 ? theme.palette.primary.contrastText
                 : theme.palette.text.secondary,
             }}
           >
             {item.icon}
           </ListItemIcon>
           <ListItemText primary={item.label} />
         </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default SmallScreenSidebarMenu;
