// src/utils/api.js

import axios from 'axios';

const baseURL = 'http://localhost:3000'; // Update with your backend server URL

const api = axios.create({
  baseURL,
});

export const submitApproval = async (approver, approvalText) => {
  try {
    const response = await api.post('/slack/submit', { approver, approvalText });
    return response.data;
  } catch (error) {
    throw error;
  }
};
