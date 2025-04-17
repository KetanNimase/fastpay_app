import React, { useState, useMemo } from 'react';
import {
  Box,
  Paper,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  IconButton,
  Chip,
  Pagination,
  TextField,
  Typography
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Refresh } from '@mui/icons-material';
import dayjs from 'dayjs';

const ClaimSubmission = () => {
  const claimsData = [
    {
      id: 1,
      practiceLocation: 'Adams',
      providerName: 'Ashley',
      insuranceName: 'VSP Vision Care',
      patientName: 'John Smith',
      serviceDate: '2024-01-13',
      billNumber: '243',
      chargeAmount: '$50.62',
      insuranceAmount: '$50.62',
      submissionDate: '2024-01-13'
    },
    {
      id: 2,
      practiceLocation: 'Boston',
      providerName: 'Dr. Williams',
      insuranceName: 'EyeMed',
      patientName: 'Emma Davis',
      serviceDate: '2024-01-14',
      billNumber: '244',
      chargeAmount: '$75.30',
      insuranceAmount: '$65.00',
      submissionDate: '2024-01-14'
    },
    {
      id: 3,
      practiceLocation: 'Cambridge',
      providerName: 'Dr. Johnson',
      insuranceName: 'Davis Vision',
      patientName: 'Michael Brown',
      serviceDate: '2024-01-15',
      billNumber: '245',
      chargeAmount: '$120.45',
      insuranceAmount: '$100.00',
      submissionDate: '2024-01-15'
    },
    {
      id: 4,
      practiceLocation: 'Dorchester',
      providerName: 'Dr. Martinez',
      insuranceName: 'Superior Vision',
      patientName: 'Sarah Wilson',
      serviceDate: '2024-01-16',
      billNumber: '246',
      chargeAmount: '$95.80',
      insuranceAmount: '$85.50',
      submissionDate: '2024-01-16'
    },
    {
      id: 5,
      practiceLocation: 'Everett',
      providerName: 'Dr. Thompson',
      insuranceName: 'UnitedHealthcare',
      patientName: 'Robert Taylor',
      serviceDate: '2024-01-17',
      billNumber: '247',
      chargeAmount: '$150.25',
      insuranceAmount: '$130.00',
      submissionDate: '2024-01-17'
    }
  ];

  const [filters, setFilters] = useState({
    location: '',
    providerName: '',
    insName: '',
    serviceDate: null,
    submissionDate: null
  });

  const [applyFilter, setApplyFilter] = useState(false);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleGoClick = () => {
    setApplyFilter(true);
    setPage(1);
  };

  const handleRefresh = () => {
    setFilters({
      location: '',
      providerName: '',
      insName: '',
      serviceDate: null,
      submissionDate: null
    });
    setApplyFilter(false);
    setPage(1);
  };

  const filteredData = useMemo(() => {
    let data = [...claimsData];
    if (!applyFilter) return data;

    if (filters.location) data = data.filter(d => d.practiceLocation === filters.location);
    if (filters.providerName) data = data.filter(d => d.providerName === filters.providerName);
    if (filters.insName) data = data.filter(d => d.insuranceName === filters.insName);
    if (filters.serviceDate)
      data = data.filter(d => dayjs(d.serviceDate).isSame(filters.serviceDate, 'day'));
    if (filters.submissionDate)
      data = data.filter(d => dayjs(d.submissionDate).isSame(filters.submissionDate, 'day'));

    return data;
  }, [applyFilter, filters]);

  const paginatedData = useMemo(() => {
    const startIndex = (page - 1) * rowsPerPage;
    return filteredData.slice(startIndex, startIndex + rowsPerPage);
  }, [filteredData, page]);

  const uniqueValues = (field) => {
    return [...new Set(claimsData.map(claim => claim[field]))];
  };

  const tabs = [
    { value: 'byClaims', label: 'By Claims' },
    { value: 'byInsurance', label: 'By Insurance' },
    { value: 'byPracticeLocation', label: 'By Practice Location' },
    { value: 'byProvider', label: 'By Provider' },
    { value: 'byAging', label: 'By Aging' }
  ];

  const statusChips = [
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

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Claim Submission
        </Typography>
      </Box>

      <Paper sx={{ p: 2, mb: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Location</InputLabel>
              <Select
                value={filters.location}
                onChange={(e) => handleFilterChange('location', e.target.value)}
              >
                <MenuItem value="">Select</MenuItem>
                {uniqueValues('practiceLocation').map(loc => (
                  <MenuItem key={loc} value={loc}>{loc}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Provider Name</InputLabel>
              <Select
                value={filters.providerName}
                onChange={(e) => handleFilterChange('providerName', e.target.value)}
              >
                <MenuItem value="">Select</MenuItem>
                {uniqueValues('providerName').map(provider => (
                  <MenuItem key={provider} value={provider}>{provider}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Superbill/Patient ID#</InputLabel>
              <Select
                value={filters.superbillId}
                onChange={(e) => handleFilterChange('superbillId', e.target.value)}
              >
                <MenuItem value="">Select</MenuItem>
                {uniqueValues('billNumber').map(id => (
                  <MenuItem key={id} value={id}>{id}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={3}>
            <DatePicker
              label="Service Date"
              value={filters.serviceDate}
              onChange={(date) => handleFilterChange('serviceDate', date)}
              slotProps={{ textField: { size: 'small', fullWidth: true } }}
            />
          </Grid>

          <Grid item xs={3}>
            <FormControl fullWidth size="small">
              <InputLabel>HCFA Type</InputLabel>
              <Select
                value={filters.hcfaType}
                onChange={(e) => handleFilterChange('hcfaType', e.target.value)}
              >
                <MenuItem value="">Select</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Claim Status</InputLabel>
              <Select
                value={filters.claimStatus}
                onChange={(e) => handleFilterChange('claimStatus', e.target.value)}
              >
                <MenuItem value="">Select</MenuItem>
                {statusChips.map(status => (
                  <MenuItem key={status} value={status}>{status}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Ins Name</InputLabel>
              <Select
                value={filters.insName}
                onChange={(e) => handleFilterChange('insName', e.target.value)}
              >
                <MenuItem value="">Select</MenuItem>
                {uniqueValues('insuranceName').map(ins => (
                  <MenuItem key={ins} value={ins}>{ins}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={3}>
            <DatePicker
              label="Submission Date"
              value={filters.submissionDate}
              onChange={(date) => handleFilterChange('submissionDate', date)}
              slotProps={{ textField: { size: 'small', fullWidth: true } }}
            />
          </Grid>

          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
            <IconButton color="primary" onClick={handleRefresh} size="small">
              <Refresh />
            </IconButton>
            <Button variant="contained" size="small" onClick={handleGoClick}>
              Go
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <Box sx={{ mb: 2 }}>
        <Tabs value="byClaims" onChange={() => {}}>
          <Tab label="By Claims" value="byClaims" />
          <Tab label="By Insurance" value="byInsurance" />
          <Tab label="By Practice Location" value="byPracticeLocation" />
          <Tab label="By Provider" value="byProvider" />
          <Tab label="By Aging" value="byAging" />
        </Tabs>
      </Box>

      <Box sx={{ mb: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
        {statusChips.map(status => (
          <Chip 
            key={status} 
            label={status} 
            onClick={() => {}}
            size="small"
            sx={{ borderRadius: 1 }}
          />
        ))}
      </Box>

      <TableContainer>
        <Table size="small" sx={{ border: '1px solid rgba(224, 224, 224, 1)' }}>
          <TableHead>
            <TableRow>
              <TableCell 
                padding="checkbox" 
                sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)' }}
              >
                <Checkbox size="small" />
              </TableCell>
              <TableCell sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)' }}>Practice Location</TableCell>
              <TableCell sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)' }}>Provider Name</TableCell>
              <TableCell sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)' }}>Insurance Name</TableCell>
              <TableCell sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)' }}>Patient Name</TableCell>
              <TableCell sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)' }}>Service Date</TableCell>
              <TableCell sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)' }}>Bill Number</TableCell>
              <TableCell sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)' }}>Charge Amt</TableCell>
              <TableCell sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)' }}>Insurance Amt</TableCell>
              <TableCell sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)' }}>Submission Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map(claim => (
              <TableRow key={claim.id}>
                <TableCell padding="checkbox" sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)' }}>
                  <Checkbox />
                </TableCell>
                <TableCell sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)' }}>{claim.practiceLocation}</TableCell>
                <TableCell sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)' }}>{claim.providerName}</TableCell>
                <TableCell sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)' }}>{claim.insuranceName}</TableCell>
                <TableCell sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)' }}>{claim.patientName}</TableCell>
                <TableCell sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)' }}>{claim.serviceDate}</TableCell>
                <TableCell sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)' }}>{claim.billNumber}</TableCell>
                <TableCell sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)' }}>{claim.chargeAmount}</TableCell>
                <TableCell sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)' }}>{claim.insuranceAmount}</TableCell>
                <TableCell sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)' }}>{claim.submissionDate}</TableCell>
                <TableCell>{/* Actions */}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', gap: 1 }}>
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
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <FormControl size="small">
            <Select
              value={rowsPerPage}
              onChange={(e) => setRowsPerPage(parseInt(e.target.value))}
              sx={{ height: 32 }}
            >
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={25}>25</MenuItem>
              <MenuItem value={50}>50</MenuItem>
            </Select>
          </FormControl>
          <Pagination 
            count={Math.ceil(filteredData.length / rowsPerPage)} 
            page={page} 
            onChange={(e, value) => setPage(value)}
            size="small"
          />
        </Box>
      </Box>
    </Box>
  );
};

export default ClaimSubmission;
