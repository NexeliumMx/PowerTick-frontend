import React from 'react';
import { Box, List, ListItem, ListItemIcon, ListItemText, Divider, useTheme } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { IconDashboard, IconUsers, IconFileText, IconChartBar } from '@tabler/icons-react'; // Add any necessary icons

const Sidebar = ({ isCollapsed }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation(); // To get the current route

  // Array of routes with name, path, and icon
  const routes = [
    { name: 'Home', path: '/', icon: <IconDashboard /> },
    { name: 'MUI Components Test', path: '/mui-components-test', icon: <IconFileText /> },
    { name: 'Load Center', path: '/LoadCenter', icon: <IconFileText /> },
    { name: 'Dashboard', path: '/dashboard', icon: <IconChartBar /> },
    { name: 'Users', path: '/users', icon: <IconUsers /> },
  ];

  return (
    <Box sx={{ height: '100%', backgroundColor: theme.palette.background.paper, padding: 2 }}>
      <List>
        {/* Iterate over the routes array */}
        {routes.map((route, index) => {
          const isSelected = location.pathname === route.path; // Check if the current path matches the route

          return (
            <React.Fragment key={index}>
              <ListItem 
                button 
                onClick={() => navigate(route.path)}
                sx={{
                  backgroundColor: isSelected ? theme.palette.action.selected : 'transparent', // Highlight if selected
                  '&:hover': {
                    backgroundColor: theme.palette.action.hover, // Hover effect
                  },
                }}
              >
                <ListItemIcon sx={{ color: isSelected ? theme.palette.primary.main : theme.palette.text.primary }}>
                  {route.icon}
                </ListItemIcon>
                {/* Only show text when sidebar is not collapsed */}
                {!isCollapsed && (
                  <ListItemText
                    primary={route.name}
                    sx={{ color: isSelected ? theme.palette.primary.main : theme.palette.text.primary }}
                  />
                )}
              </ListItem>

              {/* Add Divider between items if necessary */}
              {index < routes.length - 1 && <Divider sx={{ my: 2, borderColor: theme.palette.divider }} />}
            </React.Fragment>
          );
        })}
      </List>
    </Box>
  );
};

export default Sidebar;