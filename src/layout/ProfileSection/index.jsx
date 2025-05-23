import { useEffect, useRef, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grow from '@mui/material/Grow';

// project imports
import MainCard from './MainCard';

// assets
import User1 from 'assets/images/users/user-round.svg';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';

// ==============================|| PROFILE MENU ||============================== //

export default function ProfileSection() {
  const theme = useTheme();
  const [selectedIndex] = useState(-1);
  const [open, setOpen] = useState(false);

  /**
   * anchorRef is used on different components and specifying one type leads to other components throwing an error
   * */
  const anchorRef = useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <>
      <Chip
        sx={{
          ml: 2,
          height: '48px',
          alignItems: 'center',
          borderRadius: '27px',
          '& .MuiChip-label': {
            lineHeight: 0
          }
        }}
        icon={
          <Avatar
            src={User1}
            alt="user-images"
            sx={{
              ...theme.typography.mediumAvatar,
              margin: '8px 0 8px 8px !important',
              cursor: 'pointer'
            }}
            ref={anchorRef}
            aria-controls={open ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            color="inherit"
          />
        }
        label={<SettingsIcon stroke={1.5} size="24px" />}
        ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        color="primary"
        aria-label="user-account"
      />
      <Popper
        placement="bottom"
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        modifiers={[
          {
            name: 'offset',
            options: {
              offset: [0, 14]
            }
          }
        ]}
      >
        {({ TransitionProps }) => (
          <ClickAwayListener onClickAway={handleClose}>
            <Grow in={open} {...TransitionProps}>
              <Box sx={{ transformOrigin: '0 0 0' }}>
                <Paper>
                  {open && (
                    <MainCard border={false} elevation={16} content={false} boxShadow shadow={theme.shadows[16]}>
                      <Box sx={{ p: 2, pb: 0 }}>
                        <Stack>
                          <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center' }}>
                            <Typography variant="h4">Good Morning,</Typography>
                            <Typography component="span" variant="h4" sx={{ fontWeight: 400 }}>
                              Johne Doe
                            </Typography>
                          </Stack>
                          <Typography variant="subtitle2">Project Admin</Typography>
                        </Stack>
                        <Divider />
                      </Box>
                      <Box
                        sx={{
                          p: 2,
                          py: 0,
                          height: '100%',
                          maxHeight: 'calc(100vh - 250px)',
                          overflowX: 'hidden',
                          '&::-webkit-scrollbar': { width: 5 }
                        }}
                      >
                        <Divider />
                        <List
                          component="nav"
                          sx={{
                            width: '100%',
                            maxWidth: 350,
                            minWidth: 300,
                            borderRadius: `${theme.shape.borderRadius}px`,
                            '& .MuiListItemButton-root': { mt: 0.5 }
                          }}
                        >
                          <ListItemButton sx={{ borderRadius: `${theme.shape.borderRadius}px` }} selected={selectedIndex === 0}>
                            <ListItemIcon>
                              <SettingsIcon stroke={1.5} size="20px" />
                            </ListItemIcon>
                            <ListItemText primary={<Typography variant="body2">Account Settings</Typography>} />
                          </ListItemButton>
                          <ListItemButton sx={{ borderRadius: `${theme.shape.borderRadius}px` }} selected={selectedIndex === 4}>
                            <ListItemIcon>
                              <LogoutIcon stroke={1.5} size="20px" />
                            </ListItemIcon>
                            <ListItemText primary={<Typography variant="body2">Logout</Typography>} />
                          </ListItemButton>
                        </List>
                      </Box>
                    </MainCard>
                  )}
                </Paper>
              </Box>
            </Grow>
          </ClickAwayListener>
        )}
      </Popper>
    </>
  );
}
