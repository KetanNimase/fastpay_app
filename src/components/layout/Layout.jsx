import React, { useState } from 'react';
import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText, Collapse } from '@mui/material';
import {
  Dashboard as DashboardIcon,
  HealthAndSafety,
  Description,
  Payment,
  Report,
  Settings,
  ExpandLess,
  ExpandMore
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const drawerWidth = 240;

const menuItems = [
  { 
    text: 'Dashboard', 
    icon: <DashboardIcon />, 
    path: '/dashboard' 
  },
  { 
    text: 'Insurance Eligibility',
    icon: <HealthAndSafety />,
    children: [
      { text: 'Eligibility Overview', path: '/insurance/overview' },
      { text: 'Status & Enquiry', path: '/insurance/status' }
    ]
  },
  { text: 'Claims Submission', icon: <Description />, path: '/claims' },
  { text: 'Payment Posting', icon: <Payment />, path: '/payments' },
  { text: 'AR/Denials', icon: <Report />, path: '/ar-denials' },
  { text: 'Settings', icon: <Settings />, path: '/settings' }
];

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [openSubmenu, setOpenSubmenu] = useState('');

  const handleSubmenuClick = (text) => {
    setOpenSubmenu(openSubmenu === text ? '' : text);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: '#f8f9fa',
            borderRight: 'none'
          },
        }}
      >
        <Box sx={{ p: 2, borderBottom: '1px solid #e0e0e0' }}>
          <img src="/logo.png" alt="Fast Pay Health" style={{ width: 150 }} />
        </Box>
        <List>
          {menuItems.map((item) => (
            <React.Fragment key={item.text}>
              <ListItem
                button
                onClick={() => item.children ? handleSubmenuClick(item.text) : navigate(item.path)}
                selected={!item.children && location.pathname === item.path}
                sx={{
                  my: 0.5,
                  mx: 1,
                  borderRadius: 1,
                  '&.Mui-selected': {
                    backgroundColor: '#e3f2fd',
                    color: '#1976d2',
                    '& .MuiListItemIcon-root': {
                      color: '#1976d2',
                    },
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
                {item.children && (openSubmenu === item.text ? <ExpandLess /> : <ExpandMore />)}
              </ListItem>
              {item.children && (
                <Collapse in={openSubmenu === item.text} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {item.children.map((child) => (
                      <ListItem
                        button
                        key={child.text}
                        onClick={() => navigate(child.path)}
                        selected={location.pathname === child.path}
                        sx={{
                          pl: 4,
                          my: 0.5,
                          mx: 1,
                          borderRadius: 1,
                          '&.Mui-selected': {
                            backgroundColor: '#e3f2fd',
                            color: '#1976d2',
                          },
                        }}
                      >
                        <ListItemText primary={child.text} />
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              )}
            </React.Fragment>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {children}
      </Box>
    </Box>
  );
};

export default Layout;