import React from 'react';
import {
  Box,
  TextField,
  Typography,
  InputAdornment,
} from '@mui/material';
import { Search } from '@mui/icons-material';

const ClaimsFilter = ({ title, items }) => {
  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="subtitle2" sx={{ bgcolor: '#f5f5f5', p: 1 }}>
        {title}
      </Typography>
      <TextField
        size="small"
        placeholder="Search"
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
        }}
        sx={{ mb: 1 }}
      />
      {items.map((item, index) => (
        <Box key={index} sx={{ p: 1 }}>
          {item}
        </Box>
      ))}
    </Box>
  );
};

export default ClaimsFilter;