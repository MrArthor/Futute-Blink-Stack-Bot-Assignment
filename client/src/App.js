// src/App.js

import React, { useState } from 'react';
import ApprovalModal from './components/ApprovalModal';
import axios from 'axios';
import './App.css';

const App = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const submitApproval = async (approver, approvalText) => {
    try {
      // Make HTTP POST request to submit approval
      await axios.post('/slack/submit', { approver, approvalText });
      closeModal();
      alert('Approval request submitted successfully!');
    } catch (error) {
      console.error('Error submitting approval:', error);
      alert('Failed to submit approval request. Please try again later.');
    }
  };

  return (
    <div className="app-container">
      <h1>Slack Approval Bot</h1>
      <button onClick={openModal}>Request Approval</button>
      <ApprovalModal open={modalOpen} closeModal={closeModal} submitApproval={submitApproval} />
    </div>
  );
};

export default App;
