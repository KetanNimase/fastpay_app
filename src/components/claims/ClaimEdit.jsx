import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import claimsApi from '../../services/claimsApi';
import { toast } from 'react-toastify';

const ClaimEdit = ({ open, onClose, claimId, onSave }) => {
  const [formData, setFormData] = useState({
    practice_location: '',
    provider_name: '',
    service_date: null,
    bill_number: '',
    patient_name: '',
    charge_amount: '',
    insurance_amount: '',
    claim_status: ''
  });

  useEffect(() => {
    if (claimId) {
      fetchClaimData();
    }
  }, [claimId]);

  const fetchClaimData = async () => {
    try {
      const response = await claimsApi.getClaimDetails(claimId);
      setFormData(response.data);
    } catch (error) {
      toast.error('Failed to fetch claim details');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await claimsApi.updateClaim(claimId, formData);
      toast.success('Claim updated successfully');
      onSave();
      onClose();
    } catch (error) {
      toast.error('Failed to update claim');
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Edit Claim</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Practice Location"
                value={formData.practice_location}
                onChange={(e) => setFormData({ ...formData, practice_location: e.target.value })}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Provider Name"
                value={formData.provider_name}
                onChange={(e) => setFormData({ ...formData, provider_name: e.target.value })}
              />
            </Grid>
            <Grid item xs={6}>
              <DatePicker
                label="Service Date"
                value={formData.service_date}
                onChange={(date) => setFormData({ ...formData, service_date: date })}
                slotProps={{
                  textField: {
                    fullWidth: true
                  }
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Bill Number"
                value={formData.bill_number}
                onChange={(e) => setFormData({ ...formData, bill_number: e.target.value })}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Patient Name"
                value={formData.patient_name}
                onChange={(e) => setFormData({ ...formData, patient_name: e.target.value })}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Charge Amount"
                type="number"
                value={formData.charge_amount}
                onChange={(e) => setFormData({ ...formData, charge_amount: e.target.value })}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Insurance Amount"
                type="number"
                value={formData.insurance_amount}
                onChange={(e) => setFormData({ ...formData, insurance_amount: e.target.value })}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={formData.claim_status}
                  onChange={(e) => setFormData({ ...formData, claim_status: e.target.value })}
                >
                  <MenuItem value="Created">Created</MenuItem>
                  <MenuItem value="Submitted">Submitted</MenuItem>
                  <MenuItem value="Rejected">Rejected</MenuItem>
                  <MenuItem value="Accepted">Accepted</MenuItem>
                  <MenuItem value="Action Required">Action Required</MenuItem>
                  <MenuItem value="Processed">Processed</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained" color="primary">Save</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ClaimEdit;