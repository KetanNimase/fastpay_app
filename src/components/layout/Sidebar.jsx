import React, { useState } from 'react';
import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText, Collapse, IconButton } from '@mui/material';
import { 
  Dashboard, 
  HealthAndSafety, 
  Payment, 
  Settings, 
  Lock, 
  LockOpen,
  ExpandLess,
  ExpandMore 
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const [isLocked, setIsLocked] = useState(true);
  const [openMenus, setOpenMenus] = useState({});
  const navigate = useNavigate();

  const menuItems = [
    {
      title: 'Dashboard',
      icon: <Dashboard color="primary" />,
      path: '/dashboard'
    },
    {
      title: 'Insurance Eligibility',
      icon: <HealthAndSafety color="success" />,
      subMenus: [
        { title: 'Status & Enquiry', path: '/status-enquiry' },
        { title: 'Eligibility Overview', path: '/eligibility-overview' }
      ]
    },
    {
      title: 'Payment Posting',
      icon: <Payment color="error" />,
      subMenus: [
        { title: 'Payment Posting', path: '/payment-posting' },
        { title: 'Pt.Payment Manager', path: '/payment-manager' }
      ]
    },
    {
      title: 'Settings',
      icon: <Settings color="warning" />,
      subMenus: [
        { title: 'Business Setup', path: '/business-setup' },
        { title: 'Users and Permissions', path: '/users-permissions' },
        { title: 'Schedule Jobs', path: '/schedule-jobs' },
        { title: 'Insurance Mapping', path: '/insurance-mapping' },
        { title: 'Insurance Setup', path: '/insurance-setup' },
        { title: 'Licensing and Billing', path: '/licensing-billing' },
        { title: 'Mapping Setup', path: '/mapping-setup' }
      ]
    }
  ];

  const handleMenuClick = (title) => {
    setOpenMenus(prev => ({ ...prev, [title]: !prev[title] }));
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
        },
      }}
    >
      <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', height: '100%' }}>
        <Box sx={{ mb: 2 }}>
          <img src="/client-logo.png" alt="Client Logo" style={{ width: '100%' }} />
        </Box>

        <IconButton 
          onClick={() => setIsLocked(!isLocked)}
          sx={{ alignSelf: 'flex-end', mb: 2 }}
        >
          {isLocked ? <Lock /> : <LockOpen />}
        </IconButton>

        <List sx={{ flexGrow: 1, overflow: 'auto' }}>
          {menuItems.map((item) => (
            <React.Fragment key={item.title}>
              <ListItem 
                button 
                onClick={() => item.subMenus ? handleMenuClick(item.title) : navigate(item.path)}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.title} />
                {item.subMenus && (openMenus[item.title] ? <ExpandLess /> : <ExpandMore />)}
              </ListItem>
              
              {item.subMenus && (
                <Collapse in={openMenus[item.title]} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {item.subMenus.map((subMenu) => (
                      <ListItem 
                        button 
                        key={subMenu.title}
                        sx={{ pl: 4 }}
                        onClick={() => navigate(subMenu.path)}
                      >
                        <ListItemText primary={subMenu.title} />
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              )}
            </React.Fragment>
          ))}
        </List>

        <Box sx={{ mt: 2 }}>
          <img src="/fastpay-logo.png" alt="FastPay Health Logo" style={{ width: '100%' }} />
        </Box>
      </Box>
    </Drawer>
  );
};

export default Sidebar;