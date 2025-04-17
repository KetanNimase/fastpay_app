const express = require('express');
const router = express.Router();
const claimsQueries = require('../models/claims');

// Get dashboard data
router.get('/dashboard', async (req, res) => {
  try {
    const [claims, eligibility, arDenials] = await Promise.all([
      claimsQueries.getClaimStats(),
      claimsQueries.getInsuranceEligibility(),
      claimsQueries.getARDenials()
    ]);

    res.json({
      claims: claims.rows[0],
      eligibility: eligibility.rows[0],
      arDenials: arDenials.rows[0]
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get claims list with filters
router.get('/claims', async (req, res) => {
  try {
    const claims = await claimsQueries.getClaims(req.query);
    res.json(claims.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;