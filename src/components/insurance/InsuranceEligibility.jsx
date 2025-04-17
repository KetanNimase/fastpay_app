import React, { useState } from 'react';
import {
  Box,
  Paper,
  Grid,
  Typography,
  Avatar,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Pagination
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { Search, NotificationsOutlined, HelpOutline } from '@mui/icons-material';

const InsuranceEligibility = () => {
  const insuranceData = [
    { insurance: 'VSP', total: 17, complete: 75, success: 16, failed: 62, successRate: '92%', failedRate: '3%' },
    { insurance: 'Evolve', total: 36, complete: 14, success: 31, failed: 35, successRate: '94%', failedRate: '34%' },
    { insurance: 'UHC', total: 38, complete: 6, success: 46, failed: 30, successRate: '82%', failedRate: '15%' },
    { insurance: 'Superior Vision', total: 56, complete: 21, success: 75, failed: 90, successRate: '18%', failedRate: '17%' },
    { insurance: 'Aetna', total: 42, complete: 28, success: 35, failed: 25, successRate: '88%', failedRate: '12%' },
    { insurance: 'Cigna', total: 63, complete: 45, success: 55, failed: 18, successRate: '95%', failedRate: '5%' },
    { insurance: 'Humana', total: 29, complete: 19, success: 24, failed: 15, successRate: '86%', failedRate: '14%' },
    { insurance: 'Davis Vision', total: 44, complete: 32, success: 38, failed: 12, successRate: '91%', failedRate: '9%' },
    { insurance: 'EyeMed', total: 51, complete: 41, success: 45, failed: 16, successRate: '89%', failedRate: '11%' },
    { insurance: 'MetLife', total: 33, complete: 25, success: 28, failed: 8, successRate: '93%', failedRate: '7%' },
    { insurance: 'United Healthcare', total: 47, complete: 35, success: 42, failed: 13, successRate: '90%', failedRate: '10%' },
    { insurance: 'Blue Cross', total: 59, complete: 48, success: 52, failed: 15, successRate: '87%', failedRate: '13%' },
    { insurance: 'Kaiser', total: 31, complete: 22, success: 26, failed: 9, successRate: '85%', failedRate: '15%' },
    { insurance: 'Anthem', total: 45, complete: 36, success: 40, failed: 11, successRate: '92%', failedRate: '8%' },
    { insurance: 'Guardian', total: 38, complete: 29, success: 33, failed: 10, successRate: '88%', failedRate: '12%' }
  ];

  const [filters, setFilters] = useState({
    dateRange: null,
    appointmentDate: null,
    insurance: '',
    location: '',
    groupBy: ''
  });

  const [searchFilters, setSearchFilters] = useState({
    insurance: '',
    total: '',
    complete: '',
    success: '',
    failed: '',
    successRate: '',
    failedRate: ''
  });

  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const tableHeaders = [
    { field: 'insurance', label: 'Insurance' },
    { field: 'total', label: 'Total' },
    { field: 'complete', label: 'Complete' },
    { field: 'success', label: 'Success' },
    { field: 'failed', label: 'Failed' },
    { field: 'successRate', label: '%Success' },
    { field: 'failedRate', label: '%Failed' }
  ];

  const handleSearchChange = (field, value) => {
    setSearchFilters((prev) => ({ ...prev, [field]: value }));
    setPage(1);
  };

  const filteredData = insuranceData.filter((row) => {
    return Object.entries(searchFilters).every(([key, val]) =>
      String(row[key]).toLowerCase().includes(val.toLowerCase())
    );
  });

  const paginatedData = filteredData.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <Box>
      {/* Header */}
      <Box sx={{ p: 2, mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f8f9fa', borderBottom: '1px solid #e0e0e0' }}>
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Welcome, Keplr Vision Group</Typography>
          <Typography variant="body2" color="text.secondary">Dashboard</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton size="small"><NotificationsOutlined /></IconButton>
          <IconButton size="small"><HelpOutline /></IconButton>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Avatar sx={{ width: 32, height: 32 }}>EH</Avatar>
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>ADMIN</Typography>
              <Typography variant="caption" color="text.secondary">Esther Howard</Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Filters */}
      <Box sx={{ p: 3 }}>
        <Paper sx={{ p: 2, mb: 3, backgroundColor: '#f8f9fa' }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={3}>
              <DatePicker label="Date Range" value={filters.dateRange} onChange={(date) => setFilters({ ...filters, dateRange: date })} slotProps={{ textField: { fullWidth: true } }} />
            </Grid>
            <Grid item xs={3}>
              <DatePicker label="Appointment Date" value={filters.appointmentDate} onChange={(date) => setFilters({ ...filters, appointmentDate: date })} slotProps={{ textField: { fullWidth: true } }} />
            </Grid>
            <Grid item xs={2}>
              <FormControl fullWidth><InputLabel>Insurance</InputLabel>
                <Select value={filters.insurance} onChange={(e) => setFilters({ ...filters, insurance: e.target.value })}>
                  <MenuItem value="">Select</MenuItem>
                  {insuranceData.map((item) => (
                    <MenuItem key={item.insurance} value={item.insurance}>{item.insurance}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={2}>
              <FormControl fullWidth><InputLabel>Location</InputLabel>
                <Select value={filters.location} onChange={(e) => setFilters({ ...filters, location: e.target.value })}>
                  <MenuItem value="">Select</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={2}>
              <FormControl fullWidth><InputLabel>Group By</InputLabel>
                <Select value={filters.groupBy} onChange={(e) => setFilters({ ...filters, groupBy: e.target.value })}>
                  <MenuItem value="">Select</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button variant="contained" sx={{ px: 4 }}>Go</Button>
            </Grid>
          </Grid>
        </Paper>

        {/* Table */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                {tableHeaders.map((header) => (
                  <TableCell align={header.field === 'insurance' ? 'left' : 'center'} key={header.field}>{header.label}</TableCell>
                ))}
              </TableRow>
              <TableRow>
                {tableHeaders.map((header) => (
                  <TableCell key={header.field}>
                    <TextField
                      value={searchFilters[header.field]}
                      onChange={(e) => handleSearchChange(header.field, e.target.value)}
                      size="small"
                      placeholder="Search"
                      fullWidth
                      variant="outlined"
                      InputProps={{
                        endAdornment: (
                          <IconButton size="small"><Search fontSize="small" /></IconButton>
                        )
                      }}
                    />
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedData.map((row) => (
                <TableRow key={row.insurance}>
                  {tableHeaders.map((header) => (
                    <TableCell key={header.field} align={header.field === 'insurance' ? 'left' : 'center'}>
                      {row[header.field]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination Controls */}
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body2">Rows per page:</Typography>
            <Select
              size="small"
              value={rowsPerPage}
              onChange={(e) => {
                setRowsPerPage(parseInt(e.target.value));
                setPage(1);
              }}
            >
              {[5, 10, 20, 50].map((val) => (
                <MenuItem key={val} value={val}>{val}</MenuItem>
              ))}
            </Select>
          </Box>
          <Pagination
            count={Math.ceil(filteredData.length / rowsPerPage)}
            page={page}
            onChange={(e, value) => setPage(value)}
            color="primary"
          />
        </Box>
      </Box>
    </Box>
  );
};

export default InsuranceEligibility;
