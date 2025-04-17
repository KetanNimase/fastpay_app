import React, { useState } from 'react';
import {
  Box,
  Tabs,
  Tab,
  TextField,
  Button,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { Search, Refresh } from '@mui/icons-material';

const ClaimsSubmission = () => {
  const [tabValue, setTabValue] = useState(0);
  const [selectedRows, setSelectedRows] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [page, setPage] = useState(0);

  const statusFilters = [
    'Attention Submitter',
    'Claims In Process',
    'COB to Vision Ins',
    'Open',
    'PA Pending',
    'Paid In Full',
    'Ready For Claim',
    'Referral Pending',
    'On Hold'
  ];

  const tabs = [
    'By Claims',
    'By Insurance',
    'By Practice Location',
    'By Provider',
    'By Aging'
  ];

  const columns = [
    { id: 'checkbox', label: '', width: 50 },
    { id: 'practiceLocation', label: 'Practice Location', width: 150 },
    { id: 'provider', label: 'Provider', width: 120 },
    { id: 'insurance', label: 'Insurance Name', width: 150 },
    { id: 'serviceDate', label: 'Service Date', width: 120 },
    { id: 'billNumber', label: 'Bill Number', width: 120 },
    { id: 'patientName', label: 'Patient Name', width: 150 },
    { id: 'chargeAmount', label: 'Charge Amount', width: 120 },
    { id: 'insuranceAmount', label: 'Insurance Amount', width: 120 },
    { id: 'submissionType', label: 'Submission Type', width: 150 },
    { id: 'billStatus', label: 'Bill Status', width: 120 },
    { id: 'actions', label: 'Actions', width: 100 }
  ];

  const mockData = [
    {
      practiceLocation: 'Adams',
      provider: 'Ashley',
      serviceDate: '13/01/2024',
      billNumber: '243',
      chargeAmount: '$50.62',
      insuranceAmount: '$50.62',
    },
    // ... add more mock data
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          {statusFilters.map((filter) => (
            <Chip
              key={filter}
              label={filter}
              onClick={() => {}}
              variant="outlined"
              sx={{ borderRadius: 1 }}
            />
          ))}
        </Box>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <FormControl sx={{ width: 200 }}>
            <InputLabel>Location</InputLabel>
            <Select value="" onChange={() => {}}>
              <MenuItem value="">Select</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ width: 200 }}>
            <InputLabel>Provider Name</InputLabel>
            <Select value="" onChange={() => {}}>
              <MenuItem value="">Select</MenuItem>
            </Select>
          </FormControl>

          {/* Add more filters as shown in the image */}
        </Box>
      </Box>

      <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)}>
        {tabs.map((tab) => (
          <Tab key={tab} label={tab} />
        ))}
      </Tabs>

      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 2 }}>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button>Expand All</Button>
            <Button>Collapse All</Button>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <FormControl sx={{ width: 100 }}>
              <Select
                value={rowsPerPage}
                onChange={(e) => setRowsPerPage(e.target.value)}
                size="small"
              >
                <MenuItem value={50}>50</MenuItem>
                <MenuItem value={100}>100</MenuItem>
              </Select>
            </FormControl>
            <Button variant="contained" color="primary">
              Scrub Selected Claims
            </Button>
            <Button variant="contained" color="primary">
              Submit for Processing
            </Button>
            <Button variant="contained" color="primary">
              Push Claim Status to PMS
            </Button>
          </Box>
        </Box>

        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  style={{ width: column.width }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {mockData.map((row, index) => (
              <TableRow key={index}>
                {/* Implement table cells based on the data */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ClaimsSubmission;