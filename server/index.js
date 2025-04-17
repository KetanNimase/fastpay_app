const express = require('express');
const cors = require('cors');
const claimsRoutes = require('./routes/claims');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.use('/api/claims', claimsRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});