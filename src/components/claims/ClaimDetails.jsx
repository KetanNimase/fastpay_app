import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  Typography,
  Divider,
  Box,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';
import claimsApi from '../../services/claimsApi';
import ClaimNotes from './ClaimNotes';

const ClaimDetails = ({ open, onClose, claimId }) => {
  const [claim, setClaim] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (claimId) {
      fetchClaimDetails();
    }
  }, [claimId]);

  const fetchClaimDetails = async () => {
    try {
      const response = await claimsApi.getClaimDetails(claimId);
      setClaim(response.data);
    } catch (error) {
      console.error('Failed to fetch claim details:', error);
    } finally {
      setLoading(false);
    }
  };

  const TabPanel = ({ children, value, index }) => (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );

  if (!claim) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        Claim Details - {claim.bill_number}
        <Typography variant="subtitle2" color="textSecondary">
          Patient: {claim.patient_name}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={6}>
            <Typography variant="subtitle2">Practice Location</Typography>
            <Typography>{claim.practice_location}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle2">Provider</Typography>
            <Typography>{claim.provider_name}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle2">Service Date</Typography>
            <Typography>{new Date(claim.service_date).toLocaleDateString()}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle2">Status</Typography>
            <Typography>{claim.claim_status}</Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 2 }} />

        <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)}>
          <Tab label="Status History" />
          <Tab label="Attachments" />
          <Tab label="Notes" />
        </Tabs>

        <TabPanel value={tabValue} index={0}>
          <TableContainer component={Paper} variant="outlined">
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Notes</TableCell>
                  <TableCell>Updated By</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {claim.status_history?.map((history, index) => (
                  <TableRow key={index}>
                    <TableCell>{new Date(history.created_at).toLocaleString()}</TableCell>
                    <TableCell>{history.status}</TableCell>
                    <TableCell>{history.notes}</TableCell>
                    <TableCell>{history.created_by}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <TableContainer component={Paper} variant="outlined">
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>File Name</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Uploaded Date</TableCell>
                  <TableCell>Uploaded By</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {claim.attachments?.map((attachment, index) => (
                  <TableRow key={index}>
                    <TableCell>{attachment.file_name}</TableCell>
                    <TableCell>{attachment.file_type}</TableCell>
                    <TableCell>{new Date(attachment.uploaded_at).toLocaleString()}</TableCell>
                    <TableCell>{attachment.uploaded_by}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <ClaimNotes claimId={claimId} />
        </TabPanel>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ClaimDetails;