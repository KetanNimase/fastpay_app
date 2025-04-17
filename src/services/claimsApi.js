import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api';

const claimsApi = {
  getClaims: async (params) => {
    const response = await axios.get(`${API_BASE_URL}/claims`, { params });
    return response;
  },

  getClaimDetails: async (id) => {
    const response = await axios.get(`${API_BASE_URL}/claims/${id}`);
    return response;
  },

  updateClaim: async (id, data) => {
    const response = await axios.put(`${API_BASE_URL}/claims/${id}`, data);
    return response;
  },

  deleteClaim: async (id) => {
    const response = await axios.delete(`${API_BASE_URL}/claims/${id}`);
    return response;
  },

  getClaimNotes: async (id) => {
    const response = await axios.get(`${API_BASE_URL}/claims/${id}/notes`);
    return response;
  },

  addClaimNote: async (id, note) => {
    const response = await axios.post(`${API_BASE_URL}/claims/${id}/notes`, note);
    return response;
  }
};

export default claimsApi;