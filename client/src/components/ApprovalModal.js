// src/components/ApprovalModal.js

import React, { useState } from 'react';
import './ApprovalModal.css';

const ApprovalModal = ({ open, closeModal, submitApproval }) => {
  const [approver, setApprover] = useState('');
  const [approvalText, setApprovalText] = useState('');

  const handleSubmit = () => {
    submitApproval(approver, approvalText);
  };

  return (
    <div className={`modal ${open ? 'show' : ''}`}>
      <div className="modal-content">
        <span className="close" onClick={closeModal}>&times;</span>
        <h2>Request Approval</h2>
        <label htmlFor="approver">Approver:</label>
        <select id="approver" value={approver} onChange={(e) => setApprover(e.target.value)}>
          <option value="">Select Approver</option>
          <option value="user1">User 1</option>
          <option value="user2">User 2</option>
        </select>
        <label htmlFor="approvalText">Approval Text:</label>
        <textarea id="approvalText" value={approvalText} onChange={(e) => setApprovalText(e.target.value)}></textarea>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default ApprovalModal;
