import React, { useState } from 'react';
import {
  Box,
  Typography,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { 
  NotificationsOutlined, 
  HelpOutline,
  Person,
  Message,
  Help,
  AccountBalanceWallet,
  Lock,
  Logout,
  QuestionAnswer,
  ContactSupport,
  Feedback,
  Group,
  ErrorOutline,
  Schedule
} from '@mui/icons-material';

const Header = ({ title = "Dashboard" }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationAnchor, setNotificationAnchor] = useState(null);
  const [supportAnchor, setSupportAnchor] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationClick = (event) => {
    setNotificationAnchor(event.currentTarget);
  };

  const handleNotificationClose = () => {
    setNotificationAnchor(null);
  };

  const handleSupportClick = (event) => {
    setSupportAnchor(event.currentTarget);
  };

  const handleSupportClose = () => {
    setSupportAnchor(null);
  };

  return (
    <Box sx={{ 
      p: 2, 
      mb: 3, 
      display: 'flex', 
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#f8f9fa',
      borderBottom: '1px solid #e0e0e0'
    }}>
      <Box>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          Welcome, Keplr Vision Group
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {title}
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <IconButton size="small" onClick={handleNotificationClick}>
          <NotificationsOutlined />
        </IconButton>

        <Menu
          anchorEl={notificationAnchor}
          open={Boolean(notificationAnchor)}
          onClose={handleNotificationClose}
          PaperProps={{
            elevation: 0,
            sx: {
              width: 300,
              mt: 1.5,
              bgcolor: '#f8f9fa',
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: '#f8f9fa',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', bgcolor: '#f1f3f5' }}>
            <Typography>You have 4 new notifications</Typography>
            <Typography 
              sx={{ color: 'primary.main', cursor: 'pointer', fontSize: '0.875rem' }}
              onClick={handleNotificationClose}
            >
              Mark all as Read
            </Typography>
          </Box>
          
          <MenuItem sx={{ py: 2 }}>
            <ListItemIcon>
              <ErrorOutline sx={{ color: '#ff4d4f' }} />
            </ListItemIcon>
            <Box>
              <Typography variant="body2">Application Error</Typography>
              <Typography variant="caption" color="text.secondary">
                Just now
              </Typography>
            </Box>
          </MenuItem>

          <MenuItem sx={{ py: 2 }}>
            <ListItemIcon>
              <Schedule sx={{ color: '#52c41a' }} />
            </ListItemIcon>
            <Box>
              <Typography variant="body2">Scheduled Job Failed</Typography>
              <Typography variant="caption" color="text.secondary">
                Just now
              </Typography>
            </Box>
          </MenuItem>
        </Menu>
        <IconButton size="small" onClick={handleSupportClick}>
          <HelpOutline />
        </IconButton>

        <Menu
          anchorEl={supportAnchor}
          open={Boolean(supportAnchor)}
          onClose={handleSupportClose}
          PaperProps={{
            elevation: 0,
            sx: {
              width: 250,
              mt: 1.5,
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <Typography sx={{ p: 2, pb: 1, fontWeight: 'bold' }}>
            Support
          </Typography>
          
          <MenuItem sx={{ py: 1.5 }}>
            <ListItemIcon>
              <QuestionAnswer fontSize="small" color="primary" />
            </ListItemIcon>
            <ListItemText>Knowledge Base and Faq</ListItemText>
          </MenuItem>

          <MenuItem sx={{ py: 1.5 }}>
            <ListItemIcon>
              <ContactSupport fontSize="small" color="primary" />
            </ListItemIcon>
            <ListItemText>Contact Support</ListItemText>
          </MenuItem>

          <MenuItem sx={{ py: 1.5 }}>
            <ListItemIcon>
              <Feedback fontSize="small" color="primary" />
            </ListItemIcon>
            <ListItemText>Send Feedback</ListItemText>
          </MenuItem>

          <MenuItem sx={{ py: 1.5 }}>
            <ListItemIcon>
              <Group fontSize="small" color="primary" />
            </ListItemIcon>
            <ListItemText>Refer-A-Colleague</ListItemText>
          </MenuItem>
        </Menu>
        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 1, 
            cursor: 'pointer',
            '&:hover': { opacity: 0.8 }
          }}
          onClick={handleClick}
        >
          <Avatar sx={{ width: 32, height: 32 }}>EH</Avatar>
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
              ADMIN
            </Typography>
            <Typography variant="caption" color="text.secondary">
              fic_admin
            </Typography>
          </Box>
        </Box>
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            width: 220,
            mt: 1.5,
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Typography sx={{ p: 2, pb: 1, color: 'text.secondary' }}>
          Welcome fic_admin
        </Typography>
        <MenuItem sx={{ py: 1 }}>
          <ListItemIcon><Person fontSize="small" color="primary" /></ListItemIcon>
          <ListItemText>My Profile</ListItemText>
        </MenuItem>
        <MenuItem sx={{ py: 1 }}>
          <ListItemIcon><Message fontSize="small" color="primary" /></ListItemIcon>
          <ListItemText>Messages</ListItemText>
        </MenuItem>
        <MenuItem sx={{ py: 1 }}>
          <ListItemIcon><Help fontSize="small" color="primary" /></ListItemIcon>
          <ListItemText>Help</ListItemText>
        </MenuItem>
        <MenuItem sx={{ py: 1 }}>
          <ListItemIcon><AccountBalanceWallet fontSize="small" color="primary" /></ListItemIcon>
          <ListItemText>Balance Tokens</ListItemText>
        </MenuItem>
        <MenuItem sx={{ py: 1 }}>
          <ListItemIcon><Lock fontSize="small" color="primary" /></ListItemIcon>
          <ListItemText>Lock Screen</ListItemText>
        </MenuItem>
        <MenuItem sx={{ py: 1 }}>
          <ListItemIcon><Logout fontSize="small" color="primary" /></ListItemIcon>
          <ListItemText>Sign Out</ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default Header;