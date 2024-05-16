// src/App.js

import React, { useState } from 'react';
import ApprovalModal from './components/ApprovalModal';
import { submitApproval } from './utils/api';
import './App.css';

const App = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleSubmitApproval = async (approver, approvalText) => {
    try {
      await submitApproval(approver, approvalText);
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
      <ApprovalModal open={modalOpen} closeModal={closeModal} submitApproval={handleSubmitApproval} />
    </div>
  );
};

export default App;
