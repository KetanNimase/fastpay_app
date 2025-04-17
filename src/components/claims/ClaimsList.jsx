import React, { useState, useEffect } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Tooltip,
  TablePagination,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';
import { Edit, Delete, Refresh, Visibility } from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import claimsApi from '../../services/claimsApi';
import { toast } from 'react-toastify';
import ClaimDetails from './ClaimDetails';
import ClaimEdit from './ClaimEdit';

const ClaimsList = () => {
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [filters, setFilters] = useState({
    practice_location: '',
    provider: '',
    status: '',
    dateFrom: null,
    dateTo: null
  });
  const [totalCount, setTotalCount] = useState(0);
  const [selectedClaimId, setSelectedClaimId] = useState(null);
  const [editClaimId, setEditClaimId] = useState(null);

  const fetchClaims = async () => {
    setLoading(true);
    try {
      const response = await claimsApi.getClaims({
        page: page + 1,
        limit: rowsPerPage,
        ...filters
      });
      setClaims(response.data.data);
      setTotalCount(response.data.total);
    } catch (error) {
      toast.error('Failed to fetch claims');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchClaims();
  }, [page, rowsPerPage, filters]);

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
    setPage(0);
  };

  const handleDelete = async (id) => {
    try {
      await claimsApi.deleteClaim(id);
      toast.success('Claim deleted successfully');
      fetchClaims();
    } catch (error) {
      toast.error('Failed to delete claim');
    }
  };

  return (
    <Box>
      <Box sx={{ mb: 3, display: 'flex', gap: 2 }}>
        <FormControl sx={{ width: 200 }}>
          <InputLabel>Practice Location</InputLabel>
          <Select
            value={filters.practice_location}
            onChange={(e) => handleFilterChange('practice_location', e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            {/* Add practice locations */}
          </Select>
        </FormControl>

        <FormControl sx={{ width: 200 }}>
          <InputLabel>Provider</InputLabel>
          <Select
            value={filters.provider}
            onChange={(e) => handleFilterChange('provider', e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            {/* Add providers */}
          </Select>
        </FormControl>

        // Update DatePicker section
        <DatePicker
          label="From Date"
          value={filters.dateFrom}
          onChange={(date) => handleFilterChange('dateFrom', date)}
          sx={{ width: 200 }}
          slotProps={{
            textField: {
              size: "small",
              fullWidth: true
            }
          }}
        />

        <DatePicker
          label="To Date"
          value={filters.dateTo}
          onChange={(date) => handleFilterChange('dateTo', date)}
          sx={{ width: 200 }}
          slotProps={{
            textField: {
              size: "small",
              fullWidth: true
            }
          }}
        />
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Practice Location</TableCell>
              <TableCell>Provider</TableCell>
              <TableCell>Service Date</TableCell>
              <TableCell>Bill Number</TableCell>
              <TableCell>Patient Name</TableCell>
              <TableCell>Charge Amount</TableCell>
              <TableCell>Insurance Amount</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {claims.map((claim) => (
              <TableRow key={claim.id}>
                <TableCell>{claim.practice_location}</TableCell>
                <TableCell>{claim.provider_name}</TableCell>
                <TableCell>{new Date(claim.service_date).toLocaleDateString()}</TableCell>
                <TableCell>{claim.bill_number}</TableCell>
                <TableCell>{claim.patient_name}</TableCell>
                <TableCell>${claim.charge_amount}</TableCell>
                <TableCell>${claim.insurance_amount}</TableCell>
                <TableCell>
                  <Chip
                    label={claim.claim_status}
                    color={getStatusColor(claim.claim_status)}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Tooltip title="View">
                      <IconButton size="small" onClick={() => setSelectedClaimId(claim.id)}>
                        <Visibility fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit">
                      <IconButton size="small" onClick={() => setEditClaimId(claim.id)}>
                        <Edit fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton size="small" onClick={() => handleDelete(claim.id)}>
                        <Delete fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Refresh">
                      <IconButton size="small" onClick={() => fetchClaims()}>
                        <Refresh fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={totalCount}
          page={page}
          onPageChange={(e, newPage) => setPage(newPage)}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
          }}
          rowsPerPageOptions={[50, 100]}
        />
      </TableContainer>
      <ClaimDetails
        open={Boolean(selectedClaimId)}
        onClose={() => setSelectedClaimId(null)}
        claimId={selectedClaimId}
      />
      <ClaimEdit
        open={Boolean(editClaimId)}
        onClose={() => setEditClaimId(null)}
        claimId={editClaimId}
        onSave={fetchClaims}
      />
    </Box>
  );
};

const getStatusColor = (status) => {
  const statusColors = {
    'Created': 'default',
    'Submitted': 'primary',
    'Rejected': 'error',
    'Accepted': 'success',
    'Action Required': 'warning',
    'Processed': 'info'
  };
  return statusColors[status] || 'default';
};

export default ClaimsList;