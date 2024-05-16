// src/utils/api.js

import axios from 'axios';

const baseURL = 'https://futute-blink-stack-bot-assignment.onrender.com/'; // Update with your backend server URL

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
