import React from 'react';
import { Box, Paper, Typography, LinearProgress } from '@mui/material';

const PaymentsPosting = () => {
  return (
    <Paper sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h6">Payments Posting</Typography>
        <Typography variant="h6" sx={{ color: '#1976d2' }}>72</Typography>
      </Box>
      
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography>Total EOBs downloaded</Typography>
          <Typography>90%</Typography>
        </Box>
        <LinearProgress variant="determinate" value={90} sx={{ height: 8, borderRadius: 4 }} />
      </Box>

      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography>EOBs Processed</Typography>
          <Typography>65%</Typography>
        </Box>
        <LinearProgress variant="determinate" value={65} sx={{ height: 8, borderRadius: 4 }} />
      </Box>

      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography>Payments Posted in PMS</Typography>
          <Typography>60%</Typography>
        </Box>
        <LinearProgress variant="determinate" value={60} sx={{ height: 8, borderRadius: 4 }} />
      </Box>

      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography>EOBs Pending to Post</Typography>
          <Typography>15%</Typography>
        </Box>
        <LinearProgress variant="determinate" value={15} sx={{ height: 8, borderRadius: 4 }} />
      </Box>
    </Paper>
  );
};

export default PaymentsPosting;