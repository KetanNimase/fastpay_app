import React from 'react';
import { Box, Paper, Typography, Button } from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

const ClaimsSubmission = () => {
  const data = [
    { name: 'Claims Ready', value: 75, color: '#2196f3' },
    { name: 'Claims in Progress', value: 125, color: '#ffc107' },
    { name: 'Claims Sent', value: 425, color: '#4caf50' },
    { name: 'Pending Review', value: 12, color: '#9c27b0' }
  ];

  return (
    <Paper sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h6">Claims Submission</Typography>
        <Button variant="outlined" size="small">View Details</Button>
      </Box>

      <Box sx={{ height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={2}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-around', mt: 2 }}>
        {data.map((item) => (
          <Box key={item.name} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ color: item.color }}>{item.value}</Typography>
            <Typography variant="body2">{item.name}</Typography>
          </Box>
        ))}
      </Box>
    </Paper>
  );
};

export default ClaimsSubmission;