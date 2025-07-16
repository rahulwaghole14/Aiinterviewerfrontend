import React from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ Import navigation
import './CandidateReport.css';

const CandidateReport = () => {
  const navigate = useNavigate();

  const handleScheduleClick = () => {
    navigate('/schedule'); // ✅ Redirect to /schedule
  };

  return (
    <div className="candidate-details-container">
      <h2 className="page-title">Candidate Details</h2>

      <div className="candidate-info">
        <div>
          <p><strong>PEER:</strong> John Doe</p>
          <p><strong>Status:</strong> <span className="status-pending">Pending Scheduling</span></p>
          <p><strong>Duration:</strong> 45 Min</p>
          <p><strong>Candidate can schedule:</strong> Yes</p>
        </div>

        <div className="poc-section">
          <p><strong>POC:</strong> Rahul J. Waghole</p>
        </div>
      </div>

      {/* Schedule Interview Button */}
      <div className="center-button-wrapper">
        <button className="schedule-button" onClick={handleScheduleClick}>
          Schedule Interview
        </button>
      </div>

      <div className="chat-section">
        <h3>BR Chats</h3>
        <div className="chat-box">
          <textarea placeholder="Type a message..." rows="4"></textarea>
          <button className="send-button">Send</button>
        </div>
      </div>
    </div>
  );
};

export default CandidateReport;
