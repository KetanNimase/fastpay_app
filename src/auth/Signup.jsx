import React from 'react';
import { TextField, Button, Box, Typography, Container, MenuItem } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const states = ['AL', 'AK', 'AZ', 'AR', 'CA', /* Add all US states */];

  const phoneRegExp = /^(\+1|1)?[-. ]?\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      state: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required('Required'),
      lastName: Yup.string().required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
      phone: Yup.string().matches(phoneRegExp, 'Invalid phone number').required('Required'),
      state: Yup.string().required('Required'),
      password: Yup.string().min(8, 'Must be at least 8 characters').required('Required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Required'),
    }),
    onSubmit: (values) => {
      // Handle registration
      console.log(values);
      navigate('/login');
    },
  });

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
          <TextField
            margin="normal"
            fullWidth
            id="firstName"
            name="firstName"
            label="First Name"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}
          />
          <TextField
            margin="normal"
            fullWidth
            id="lastName"
            name="lastName"
            label="Last Name"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName}
          />
          <TextField
            margin="normal"
            fullWidth
            id="email"
            name="email"
            label="Email Address"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            margin="normal"
            fullWidth
            id="phone"
            name="phone"
            label="Phone Number"
            value={formik.values.phone}
            onChange={formik.handleChange}
            error={formik.touched.phone && Boolean(formik.errors.phone)}
            helperText={formik.touched.phone && formik.errors.phone}
          />
          <TextField
            margin="normal"
            fullWidth
            id="state"
            name="state"
            select
            label="State"
            value={formik.values.state}
            onChange={formik.handleChange}
            error={formik.touched.state && Boolean(formik.errors.state)}
            helperText={formik.touched.state && formik.errors.state}
          >
            {states.map((state) => (
              <MenuItem key={state} value={state}>
                {state}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            margin="normal"
            fullWidth
            id="password"
            name="password"
            label="Password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <TextField
            margin="normal"
            fullWidth
            id="confirmPassword"
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
            helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Box sx={{ textAlign: 'center' }}>
            <Button
              variant="text"
              onClick={() => navigate('/login')}
            >
              Already have an account? Sign in
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Signup;