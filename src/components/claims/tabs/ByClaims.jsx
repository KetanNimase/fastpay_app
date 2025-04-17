import React, { useState, useEffect } from 'react';
import {
  Box,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  IconButton,
  Tooltip
} from '@mui/material';
import { Edit, Delete, Refresh, Visibility } from '@mui/icons-material';
import { claimsApi } from '../../../services/claimsApi';

const ByClaims = () => {
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedClaims, setSelectedClaims] = useState([]);

  const statusChips = [
    { label: 'Created', color: 'primary' },
    { label: 'Submitted', color: 'info' },
    { label: 'Rejected', color: 'error' },
    { label: 'Accepted', color: 'success' },
    { label: 'Action Required', color: 'warning' },
    { label: 'Processed', color: 'default' }
  ];

  const fetchClaims = async () => {
    setLoading(true);
    try {
      const response = await claimsApi.getClaims();
      setClaims(response.data);
    } catch (error) {
      console.error('Error fetching claims:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchClaims();
  }, []);

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedClaims(claims.map(claim => claim.id));
    } else {
      setSelectedClaims([]);
    }
  };

  const handleSelectClaim = (id) => {
    setSelectedClaims(prev => {
      if (prev.includes(id)) {
        return prev.filter(claimId => claimId !== id);
      }
      return [...prev, id];
    });
  };

  return (
    <Box>
      <Box sx={{ mb: 2, display: 'flex', gap: 1 }}>
        {statusChips.map((chip) => (
          <Chip
            key={chip.label}
            label={chip.label}
            color={chip.color}
            variant="outlined"
            onClick={() => {}}
          />
        ))}
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  onChange={handleSelectAll}
                  checked={selectedClaims.length === claims.length}
                  indeterminate={selectedClaims.length > 0 && selectedClaims.length < claims.length}
                />
              </TableCell>
              <TableCell>Service Date</TableCell>
              <TableCell>Claim Number</TableCell>
              <TableCell>Patient Name</TableCell>
              <TableCell>Charge Amt</TableCell>
              <TableCell>Insurance Amount</TableCell>
              <TableCell>Submission Type</TableCell>
              <TableCell>Claim Status</TableCell>
              <TableCell>Submission Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {claims.map((claim) => (
              <TableRow key={claim.id}>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedClaims.includes(claim.id)}
                    onChange={() => handleSelectClaim(claim.id)}
                  />
                </TableCell>
                <TableCell>{claim.serviceDate}</TableCell>
                <TableCell>{claim.claimNumber}</TableCell>
                <TableCell>{claim.patientName}</TableCell>
                <TableCell>{claim.chargeAmount}</TableCell>
                <TableCell>{claim.insuranceAmount}</TableCell>
                <TableCell>{claim.submissionType}</TableCell>
                <TableCell>{claim.claimStatus}</TableCell>
                <TableCell>{claim.submissionDate}</TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Tooltip title="View">
                      <IconButton size="small">
                        <Visibility fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit">
                      <IconButton size="small">
                        <Edit fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton size="small">
                        <Delete fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Refresh">
                      <IconButton size="small">
                        <Refresh fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ByClaims;