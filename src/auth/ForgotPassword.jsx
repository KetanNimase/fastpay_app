import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const ForgotPassword = ({ open, onClose }) => {
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
    }),
    onSubmit: (values) => {
      // Handle password reset
      console.log(values);
      onClose();
    },
  });

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Reset Password</DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email Address"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            margin="dense"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained">Send Reset Link</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ForgotPassword;