import { Drawer, List, ListItem, ListItemIcon, ListItemText, useTheme } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import ElectricMeterOutlinedIcon from "@mui/icons-material/ElectricMeterOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import LocalLibraryOutlinedIcon from "@mui/icons-material/LocalLibraryOutlined";
import ScienceOutlinedIcon from "@mui/icons-material/ScienceOutlined";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import WindPowerOutlinedIcon from "@mui/icons-material/WindPowerOutlined";

const SmallScreenSidebarMenu = ({ isOpen, toggleDrawer }) => {
  const theme = useTheme();
  const location = useLocation();

  const getMenuItemStyles = (isSelected) => ({
    backgroundColor: isSelected ? theme.palette.primary.main : "inherit", // Fondo más oscuro cuando está seleccionado
    color: isSelected ? theme.palette.primary.contrastText : theme.palette.text.secondary, // Texto claro cuando está seleccionado
    "&:hover": {
      backgroundColor: theme.palette.primary.dark, // Oscurecer un poco el fondo al hacer hover
      color: theme.palette.primary.contrastText, // Mantener el texto claro
    },
  });
  

  const selectedRoute = (path) => location.pathname === path;

  return (
    <Drawer
      anchor="left"
      open={isOpen}
      onClose={toggleDrawer(false)}
      PaperProps={{
        sx: {
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
        },
      }}
    >
      <List>
        <ListItem 
          button 
          component={Link} 
          to="/" 
          sx={getMenuItemStyles(selectedRoute("/"))}
        >
          <ListItemIcon sx={{ color: selectedRoute("/") ? theme.palette.primary.contrastText : theme.palette.text.secondary }}>
            <HomeOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>

        <ListItem 
          button 
          component={Link} 
          to="/locations" 
          sx={getMenuItemStyles(selectedRoute("/locations"))}
        >
          <ListItemIcon sx={{ color: selectedRoute("/locations") ? theme.palette.primary.contrastText : theme.palette.text.secondary }}>
            <LocationOnOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Locations" />
        </ListItem>

        <ListItem 
          button 
          component={Link} 
          to="/substations" 
          sx={getMenuItemStyles(selectedRoute("/substations"))}
        >
          <ListItemIcon sx={{ color: selectedRoute("/substations") ? theme.palette.primary.contrastText : theme.palette.text.secondary }}>
            <WindPowerOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Substations" />
        </ListItem>

        <ListItem 
          button 
          component={Link} 
          to="/load-center" 
          sx={getMenuItemStyles(selectedRoute("/load-center"))}
        >
          <ListItemIcon sx={{ color: selectedRoute("/load-center") ? theme.palette.primary.contrastText : theme.palette.text.secondary }}>
            <ElectricMeterOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Load Center" />
        </ListItem>

        <ListItem 
          button 
          component={Link} 
          to="/dashboard" 
          sx={getMenuItemStyles(selectedRoute("/dashboard"))}
        >
          <ListItemIcon sx={{ color: selectedRoute("/dashboard") ? theme.palette.primary.contrastText : theme.palette.text.secondary }}>
            <DashboardOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>

        <ListItem 
          button 
          component={Link} 
          to="/add-meter" 
          sx={getMenuItemStyles(selectedRoute("/add-meter"))}
        >
          <ListItemIcon sx={{ color: selectedRoute("/add-meter") ? theme.palette.primary.contrastText : theme.palette.text.secondary }}>
            <ElectricMeterOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Add Meter" />
        </ListItem>

        <ListItem 
          button 
          component={Link} 
          to="/calendar" 
          sx={getMenuItemStyles(selectedRoute("/calendar"))}
        >
          <ListItemIcon sx={{ color: selectedRoute("/calendar") ? theme.palette.primary.contrastText : theme.palette.text.secondary }}>
            <CalendarTodayOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Calendar" />
        </ListItem>

        <ListItem 
          button 
          component={Link} 
          to="/downloads" 
          sx={getMenuItemStyles(selectedRoute("/downloads"))}
        >
          <ListItemIcon sx={{ color: selectedRoute("/downloads") ? theme.palette.primary.contrastText : theme.palette.text.secondary }}>
            <DownloadOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Downloads" />
        </ListItem>

        <ListItem 
          button 
          component={Link} 
          to="/users" 
          sx={getMenuItemStyles(selectedRoute("/users"))}
        >
          <ListItemIcon sx={{ color: selectedRoute("/users") ? theme.palette.primary.contrastText : theme.palette.text.secondary }}>
            <PeopleOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Manage Users" />
        </ListItem>

        <ListItem 
          button 
          component={Link} 
          to="/users-new" 
          sx={getMenuItemStyles(selectedRoute("/users-new"))}
        >
          <ListItemIcon sx={{ color: selectedRoute("/users-new") ? theme.palette.primary.contrastText : theme.palette.text.secondary }}>
            <PersonOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="New User" />
        </ListItem>

        <ListItem 
          button 
          component={Link} 
          to="/faq" 
          sx={getMenuItemStyles(selectedRoute("/faq"))}
        >
          <ListItemIcon sx={{ color: selectedRoute("/faq") ? theme.palette.primary.contrastText : theme.palette.text.secondary }}>
            <HelpOutlineOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="FAQ" />
        </ListItem>

        <ListItem 
          button 
          component={Link} 
          to="/user-manual" 
          sx={getMenuItemStyles(selectedRoute("/user-manual"))}
        >
          <ListItemIcon sx={{ color: selectedRoute("/user-manual") ? theme.palette.primary.contrastText : theme.palette.text.secondary }}>
            <LocalLibraryOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="User Manual" />
        </ListItem>

        <ListItem 
          button 
          component={Link} 
          to="/mui-components-test" 
          sx={getMenuItemStyles(selectedRoute("/mui-components-test"))}
        >
          <ListItemIcon sx={{ color: selectedRoute("/mui-components-test") ? theme.palette.primary.contrastText : theme.palette.text.secondary }}>
            <ScienceOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Test Page" />
        </ListItem>

        <ListItem 
          button 
          component={Link} 
          to="*" 
          sx={getMenuItemStyles(selectedRoute("*"))}
        >
          <ListItemIcon sx={{ color: selectedRoute("*") ? theme.palette.primary.contrastText : theme.palette.text.secondary }}>
            <ErrorOutlineOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Not Found" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default SmallScreenSidebarMenu;