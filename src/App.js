import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import CssBaseline from '@mui/material/CssBaseline';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Layout from './components/layout/Layout';
import Dashboard from './components/dashboard/Dashboard';
import ClaimsList from './components/claims/ClaimsList';
import InsuranceEligibility from './components/insurance/InsuranceEligibility';
import StatusEnquiry from './components/insurance/StatusEnquiry';
import ClaimSubmission from './components/claims/ClaimSubmission';
import theme from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <CssBaseline />
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/insurance/overview" element={<InsuranceEligibility />} />
              <Route path="/insurance/status" element={<StatusEnquiry />} />
              <Route path="/claims" element={<ClaimSubmission />} />
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </Layout>
        </BrowserRouter>
        <ToastContainer position="top-right" autoClose={3000} />
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
