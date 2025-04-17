import React from 'react';
import { Box, Paper, Typography, LinearProgress } from '@mui/material';

const ARDenials = () => {
  return (
    <Paper sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h6">AR/Denials Management</Typography>
        <Typography variant="h6" sx={{ color: '#1976d2' }}>73</Typography>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography>Today's Rejections</Typography>
          <Typography>25%</Typography>
        </Box>
        <LinearProgress variant="determinate" value={25} sx={{ height: 8, borderRadius: 4 }} />
      </Box>

      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography>Today's Denials</Typography>
          <Typography>45%</Typography>
        </Box>
        <LinearProgress variant="determinate" value={45} sx={{ height: 8, borderRadius: 4 }} />
      </Box>

      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography>Rejections resolved</Typography>
          <Typography>55%</Typography>
        </Box>
        <LinearProgress variant="determinate" value={55} sx={{ height: 8, borderRadius: 4 }} />
      </Box>

      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography>Denials Resolved</Typography>
          <Typography>15%</Typography>
        </Box>
        <LinearProgress variant="determinate" value={15} sx={{ height: 8, borderRadius: 4 }} />
      </Box>

      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography>Today's Follow Up</Typography>
          <Typography>85%</Typography>
        </Box>
        <LinearProgress variant="determinate" value={85} sx={{ height: 8, borderRadius: 4 }} />
      </Box>
    </Paper>
  );
};

export default ARDenials;