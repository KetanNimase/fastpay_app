import React, { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  IconButton, 
  Menu, 
  MenuItem, 
  Box,
  Breadcrumbs,
  Link,
  Alert,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { 
  Help, 
  AccountCircle, 
  Notifications,
  NavigateNext,
  Person,
  Message,
  AccountBalanceWallet,
  Lock,
  Logout,
  ErrorOutline,
  CheckCircleOutline
} from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';

const Header = () => {
  const [profileAnchor, setProfileAnchor] = useState(null);
  const [supportAnchor, setSupportAnchor] = useState(null);
  const [notificationAnchor, setNotificationAnchor] = useState(null);

  const notifications = [
    {
      title: 'Application Error',
      time: 'Just now',
      type: 'error',
      icon: <ErrorOutline color="error" />
    },
    {
      title: 'Scheduled Job Failed',
      time: 'Just now',
      type: 'warning',
      icon: <CheckCircleOutline color="warning" />
    }
  ];

  const profileMenuItems = [
    { icon: <Person />, text: 'My Profile' },
    { icon: <Message />, text: 'Messages' },
    { icon: <Help />, text: 'Help' },
    { icon: <AccountBalanceWallet />, text: 'Balance Tokens' },
    { icon: <Lock />, text: 'Lock Screen' },
    { icon: <Logout />, text: 'Sign Out' }
  ];

  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Breadcrumbs separator={<NavigateNext />}>
            <Link color="inherit" href="/" onClick={(e) => {
              e.preventDefault();
              navigate('/');
            }}>
              Home
            </Link>
            {getBreadcrumbs()}
          </Breadcrumbs>
          <Typography variant="h6" sx={{ mt: 1 }}>
            {pathSegments[pathSegments.length - 1]?.charAt(0).toUpperCase() + 
             pathSegments[pathSegments.length - 1]?.slice(1) || 'Dashboard'}
          </Typography>
        </Box>

        <IconButton onClick={(e) => setSupportAnchor(e.currentTarget)}>
          <Help />
        </IconButton>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton onClick={(e) => setNotificationAnchor(e.currentTarget)}>
            <Notifications />
          </IconButton>

          <Menu
            anchorEl={notificationAnchor}
            open={Boolean(notificationAnchor)}
            onClose={() => setNotificationAnchor(null)}
            PaperProps={{
              sx: { width: 320, maxHeight: 400 }
            }}
          >
            <Box sx={{ p: 2, bgcolor: '#f4f6f8' }}>
              <Typography variant="subtitle1" component="div" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                You have 4 new notifications
                <Link component="button" underline="none">Mark all as Read</Link>
              </Typography>
            </Box>
            {notifications.map((notification, index) => (
              <MenuItem key={index} sx={{ py: 1.5 }}>
                <ListItemIcon>{notification.icon}</ListItemIcon>
                <Box>
                  <Typography variant="subtitle2">{notification.title}</Typography>
                  <Typography variant="caption" color="text.secondary">{notification.time}</Typography>
                </Box>
              </MenuItem>
            ))}
          </Menu>

          <IconButton onClick={(e) => setProfileAnchor(e.currentTarget)}>
            <AccountCircle />
          </IconButton>

          <Menu
            anchorEl={profileAnchor}
            open={Boolean(profileAnchor)}
            onClose={() => setProfileAnchor(null)}
            PaperProps={{
              sx: { width: 220 }
            }}
          >
            <Box sx={{ p: 2, borderBottom: '1px solid #eee' }}>
              <Typography variant="subtitle1">Welcome fic_admin</Typography>
            </Box>
            {profileMenuItems.map((item, index) => (
              <MenuItem key={index} sx={{ py: 1 }}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>

      <Alert 
        severity="success" 
        sx={{ 
          position: 'fixed', 
          bottom: 0, 
          left: 0, 
          right: 0,
          borderRadius: 0 
        }}
      >
        The process has started and will continue to run in the background. Depending on the number of insurances being refreshed from PMS and verified & updated in FastPayHealth.ai, it may take few mins to complete
      </Alert>
    </AppBar>
  );
};

export default Header;