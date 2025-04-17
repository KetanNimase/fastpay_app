import React, { useState } from 'react';
import {
  Box,
  Paper,
  TextField,
  Select,
  MenuItem,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  FormControl,
  InputLabel,
  Grid,
  Typography
} from '@mui/material';
import { Visibility, Edit, Delete } from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers';

const StatusEnquiry = () => {
  const [filters, setFilters] = useState({
    dateRange: null,
    location: '',
  });

  const stats = [
    { label: 'Total Appointments', value: '40', color: '#2196f3' },
    { label: 'Req Calling', value: '08', color: '#2196f3' },
    { label: 'Pending', value: '00', color: '#2196f3' },
    { label: 'Completed', value: '28', color: '#2196f3' },
    { label: 'Partial Completed', value: '28', color: '#2196f3' },
    { label: 'Policy Next Month', value: '25', color: '#2196f3' },
    { label: 'Failed', value: '25', color: '#2196f3' },
  ];

  const rows = [
    {
      lastName: 'Walker',
      firstName: 'Andrew',
      dob: '04/08/2020',
      ssn: '-',
      age: '25',
      apptDate: '05/14/2024',
      provider: 'Ashley Adams',
      status: 'Need Policy ID'
    },
    // Add more rows as needed
  ];

  return (
    <Box>
      <Paper sx={{ p: 2, mb: 2 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={3}>
            <DatePicker
              label="Date Range"
              value={filters.dateRange}
              onChange={(date) => setFilters({ ...filters, dateRange: date })}
              slotProps={{ textField: { fullWidth: true } }}
            />
          </Grid>
          <Grid item xs={3}>
            <FormControl fullWidth>
              <InputLabel>Location</InputLabel>
              <Select
                value={filters.location}
                onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                label="Location"
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="loc1">Location 1</MenuItem>
                <MenuItem value="loc2">Location 2</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={2}>
            <Button variant="contained" color="primary">
              Go
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <Box sx={{ mb: 3, display: 'flex', gap: 2, overflowX: 'auto' }}>
        {stats.map((stat) => (
          <Paper
            key={stat.label}
            sx={{
              p: 2,
              minWidth: 150,
              textAlign: 'center',
              backgroundColor: stat.color,
              color: 'white'
            }}
          >
            <Typography variant="h4">{stat.value}</Typography>
            <Typography>{stat.label}</Typography>
          </Paper>
        ))}
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Last Name</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>DOB</TableCell>
              <TableCell>SSN</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Appt Date</TableCell>
              <TableCell>Provider</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.lastName}>
                <TableCell>{row.lastName}</TableCell>
                <TableCell>{row.firstName}</TableCell>
                <TableCell>{row.dob}</TableCell>
                <TableCell>{row.ssn}</TableCell>
                <TableCell>{row.age}</TableCell>
                <TableCell>{row.apptDate}</TableCell>
                <TableCell>{row.provider}</TableCell>
                <TableCell>{row.status}</TableCell>
                <TableCell>
                  <IconButton size="small"><Visibility /></IconButton>
                  <IconButton size="small"><Edit /></IconButton>
                  <IconButton size="small"><Delete /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default StatusEnquiry;