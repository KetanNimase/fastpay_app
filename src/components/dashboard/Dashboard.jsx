import React from 'react';
import { Box, Grid } from '@mui/material';
import Header from '../common/Header';
import InsuranceEligibility from './InsuranceEligibility';
import PaymentsPosting from './PaymentsPosting';
import ClaimsSubmission from './ClaimsSubmission';
import ARDenials from './ARDenials';

const Dashboard = () => {
  return (
    <Box>
      <Header />
      <Box sx={{ p: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <InsuranceEligibility />
          </Grid>
          <Grid item xs={12} md={6}>
            <PaymentsPosting />
          </Grid>
          <Grid item xs={12} md={6}>
            <ClaimsSubmission />
          </Grid>
          <Grid item xs={12} md={6}>
            <ARDenials />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;