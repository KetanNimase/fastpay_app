const pool = require('../config/db');

const claimsQueries = {
  // Get all claims with filters
  getClaims: async (filters) => {
    const { page = 1, limit = 10, status, dateFrom, dateTo } = filters;
    const offset = (page - 1) * limit;
    
    let query = 'SELECT * FROM claims WHERE 1=1';
    const values = [];
    
    if (status) {
      values.push(status);
      query += ` AND claim_status = $${values.length}`;
    }
    
    if (dateFrom) {
      values.push(dateFrom);
      query += ` AND service_date >= $${values.length}`;
    }
    
    if (dateTo) {
      values.push(dateTo);
      query += ` AND service_date <= $${values.length}`;
    }
    
    values.push(limit, offset);
    query += ` ORDER BY created_at DESC LIMIT $${values.length - 1} OFFSET $${values.length}`;
    
    return pool.query(query, values);
  },

  // Get claim statistics
  getClaimStats: async () => {
    const query = `
      SELECT
        COUNT(*) as total_claims,
        COUNT(CASE WHEN claim_status = 'Created' THEN 1 END) as created,
        COUNT(CASE WHEN claim_status = 'Submitted' THEN 1 END) as submitted,
        COUNT(CASE WHEN claim_status = 'Rejected' THEN 1 END) as rejected,
        COUNT(CASE WHEN claim_status = 'Accepted' THEN 1 END) as accepted
      FROM claims
    `;
    return pool.query(query);
  },

  // Get insurance eligibility data
  getInsuranceEligibility: async () => {
    const query = `
      SELECT
        COUNT(*) as total_appointments,
        COUNT(CASE WHEN status = 'Verified' THEN 1 END) as verified,
        COUNT(CASE WHEN status = 'Failed' THEN 1 END) as failed,
        COUNT(CASE WHEN policy_expiry <= (CURRENT_DATE + INTERVAL '1 month') THEN 1 END) as expiring_soon
      FROM insurance_eligibility
    `;
    return pool.query(query);
  },

  // Get AR/Denials data
  getARDenials: async () => {
    const query = `
      SELECT
        COUNT(CASE WHEN type = 'Rejection' AND created_at::date = CURRENT_DATE THEN 1 END) as todays_rejections,
        COUNT(CASE WHEN type = 'Denial' AND created_at::date = CURRENT_DATE THEN 1 END) as todays_denials,
        COUNT(CASE WHEN type = 'Rejection' AND status = 'Resolved' THEN 1 END) as rejections_resolved,
        COUNT(CASE WHEN type = 'Denial' AND status = 'Resolved' THEN 1 END) as denials_resolved,
        COUNT(CASE WHEN follow_up_date::date = CURRENT_DATE THEN 1 END) as todays_followup
      FROM ar_denials
    `;
    return pool.query(query);
  }
};

module.exports = claimsQueries;