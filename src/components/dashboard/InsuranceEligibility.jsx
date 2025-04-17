import React from 'react';
import { Box, Paper, Typography, Grid } from '@mui/material';
import { CheckCircle, Cancel, Update } from '@mui/icons-material';

const InsuranceEligibility = () => {
  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>Insurance Eligibility Overview</Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Box sx={{ 
            bgcolor: '#e0f7fa',
            p: 2,
            borderRadius: 1,
            textAlign: 'center'
          }}>
            <Typography variant="h3">40</Typography>
            <Typography>Total Appointments</Typography>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box sx={{ 
            bgcolor: '#e8f5e9',
            p: 2,
            borderRadius: 1,
            textAlign: 'center'
          }}>
            <Typography variant="h3">40</Typography>
            <Typography>Verified Successfully</Typography>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box sx={{ 
            bgcolor: '#ffebee',
            p: 2,
            borderRadius: 1,
            textAlign: 'center'
          }}>
            <Typography variant="h3">20</Typography>
            <Typography>Appointments Failed</Typography>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box sx={{ 
            bgcolor: '#f3e5f5',
            p: 2,
            borderRadius: 1,
            textAlign: 'center'
          }}>
            <Typography variant="h3">10</Typography>
            <Typography>Policy Next Month</Typography>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default InsuranceEligibility;