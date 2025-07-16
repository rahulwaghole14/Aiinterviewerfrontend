import React, { useState } from "react";
import "./Dashboard.css";

const Container = ({ children }) => (
  <div className="cardDashboard-container">
    {children}
  </div>
);

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("Last 30 days");
  const options = [
    "Yesterday", "Last 3 days", "Last 7 days",
    "Last 14 days", "Last 28 days", "Last 30 days"
  ];

  const toggleDropdown = () => setIsOpen(!isOpen);
  const handleSelect = (option) => {
    setSelected(option);
    setIsOpen(false);
  };

  return (
    <div className="dropdown-wrapper">
      <button className="dropdown-toggle" onClick={toggleDropdown}>
        {selected} ▼
      </button>
      {isOpen && (
        <ul className="dropdown-menu">
          {options.map((option, idx) => (
            <li
              key={idx}
              onClick={() => handleSelect(option)}
              className={selected === option ? "active" : ""}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const ReviewScoreTable = () => (
  <div className="review-table">
    <div className="review-row header">
      <div>Name / Number</div>
      <div>Roles</div>
      <div>Status</div>
      <div>Days Ago</div>
      <div>Score</div>
      <div>Action</div>
    </div>
    <div className="review-row">
      <div>
        <strong>Bhavana Mah...</strong><br />
        <span className="small-text">+919146474757</span>
      </div>
      <div>
        <div>Software Dev...</div>
        <div>Software Backend ...</div>
      </div>
      <div className="status-tag">Not recommended</div>
      <div>15 days ago</div>
      <div>1</div>
      <div>
        <a href="/" className="action-link">Move to Internal Interview</a>
      </div>
    </div>
  </div>
);

const DashboardPage = () => {
  return (
    <div className="dashboard-wrapper">
      {/* Dashboard Title */}
      <div className="dashboard-title-container">
        <h1 className="dashboard-title">Dashboard</h1>
      </div>

      {/* Header row: Dropdown + My Tasks button */}
      <div className="dashboard-header">
        <Dropdown />
        <button className="task-buttonDashboard">
          My Tasks <span className="badgeDashboard">1</span>
        </button>
      </div>

      {/* Review Score Card */}
      <Container>
        <div className="cardDashboard review">
          <div className="cardDashboard-header">
            <span>Review Score</span>
            <span className="badgeDashboard">1</span>
          </div>
          <div className="cardDashboard-content">
            <ReviewScoreTable />
          </div>
        </div>
      </Container>

      {/* Schedule Interview Card */}
      <Container>
        <div className="cardDashboard interview">
          <div className="cardDashboard-header">
            <span>Schedule Interview</span>
            <span className="badgeDashboard">0</span>
          </div>
          <div className="cardDashboard-content">
            <p>You have scheduled all the interviews.</p>
          </div>
        </div>
      </Container>

      {/* Queries Card */}
      <Container>
        <div className="cardDashboard query">
          <div className="cardDashboard-header">
            <span>Queries</span>
            <span className="badgeDashboard">0</span>
          </div>
          <div className="cardDashboard-content">
            <p>You have answered all the queries.</p>
          </div>
        </div>
      </Container>

      {/* Updates Required Card */}
      <Container>
        <div className="cardDashboard update">
          <div className="cardDashboard-header">
            <span>Updates Required</span>
            <span className="badgeDashboard">0</span>
          </div>
          <div className="cardDashboard-content">
            <p>No updates required.</p>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default DashboardPage;
