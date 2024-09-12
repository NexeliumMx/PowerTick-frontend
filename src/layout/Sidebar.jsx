import React from 'react';
import { Box, List, ListItem, ListItemIcon, ListItemText, Collapse, Divider, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { IconDashboard, IconUsers, IconFileText, IconChartBar, IconChevronDown, IconChevronUp } from '@tabler/icons-react';

const Sidebar = ({ isCollapsed }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [openDashboard, setOpenDashboard] = React.useState(false);

  const handleDashboardClick = () => {
    setOpenDashboard(!openDashboard);
  };

  return (
    <Box sx={{ height: '100%', backgroundColor: theme.palette.background.paper, padding: 2 }}>
      <List>
        {/* Dashboard */}
        <ListItem button onClick={handleDashboardClick}>
          <ListItemIcon>
            <IconDashboard />
          </ListItemIcon>
          {/* Only show text when not collapsed */}
          {!isCollapsed && <ListItemText primary="Dashboard" sx={{ color: theme.palette.text.primary }} />}
          {openDashboard && !isCollapsed ? <IconChevronUp /> : <IconChevronDown />}
        </ListItem>

        <Collapse in={openDashboard && !isCollapsed} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button sx={{ pl: 4 }} onClick={() => navigate('/dashboard/default')}>
              <ListItemIcon>
                <IconFileText />
              </ListItemIcon>
              {!isCollapsed && <ListItemText primary="Default" sx={{ color: theme.palette.text.primary }} />}
            </ListItem>
            <ListItem button sx={{ pl: 4 }} onClick={() => navigate('/dashboard/analytics')}>
              <ListItemIcon>
                <IconChartBar />
              </ListItemIcon>
              {!isCollapsed && <ListItemText primary="Analytics" sx={{ color: theme.palette.text.primary }} />}
            </ListItem>
          </List>
        </Collapse>

        <Divider sx={{ my: 2, borderColor: theme.palette.divider }} />

        {/* Widgets */}
        <ListItem button onClick={() => navigate('/widgets')}>
          <ListItemIcon>
            <IconFileText />
          </ListItemIcon>
          {!isCollapsed && <ListItemText primary="Widgets" sx={{ color: theme.palette.text.primary }} />}
        </ListItem>

        <Divider sx={{ my: 2, borderColor: theme.palette.divider }} />

        {/* Users */}
        <ListItem button onClick={() => navigate('/users')}>
          <ListItemIcon>
            <IconUsers />
          </ListItemIcon>
          {!isCollapsed && <ListItemText primary="Users" sx={{ color: theme.palette.text.primary }} />}
        </ListItem>
      </List>
    </Box>
  );
};

export default Sidebar;