import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom'; // ✅ Import useNavigate
import './Interviews.css';

function Interviews() {
  const [interviewDate, setInterviewDate] = useState(null);
  const [activeTab, setActiveTab] = useState("All");

  const [formData, setFormData] = useState({
    status: '',
    job: '',
    poc: '',
    date: ''
  });

  const navigate = useNavigate(); // ✅ Initialize navigate

  const tabs = ["All", "Today", "Tomorrow", "Upcoming", "Pending Feedback", "Completed"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDateChange = (date) => {
    setInterviewDate(date);
    setFormData((prev) => ({
      ...prev,
      date: date ? date.toISOString().split('T')[0] : ''
    }));
  };

  const handleClearFilters = () => {
    setFormData({
      status: '',
      job: '',
      poc: '',
      date: ''
    });
    setInterviewDate(null);
  };

  const activeFilterCount = Object.values(formData).filter(Boolean).length;

  return (
    <div className="interviews-container">
      <h2 className="interviews-title">Interviews</h2>

      <div className="top-row">
        <div className="tabs-container">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={activeTab === tab ? "tab active" : "tab"}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="main-content">
        <div className="right-content">
          <div className="search-sort">
            <div className="search-input-wrapper">
              <input className='inputinterview' type="text" placeholder="Search Candidates" />
            </div>
            <div className="sort-select-wrapper">
              <select>
                <option value="date-desc">Interview Date (Descending)</option>
                <option value="date-asc">Interview Date (Ascending)</option>
              </select>
            </div>
          </div>

          <div className="interview-row">
            <div className="top-row-line">
              <span className="candidate-name">Neha Sharma</span>
              <span className="status">Completed (21 July, 25 - 12:30)</span>
              <span
                className="view-report"
                onClick={() => navigate('/candidatereport')}
                style={{ cursor: 'pointer', color: '#007bff' }}
              >
                View Report
              </span>
            </div>
            <div className="details-line">Thu, 21 July, 25 - 12:30</div>
            <div className="details-line">Software Development - frontend - Round 1</div>
          </div>


          <p className="no-results">No Results Found</p>
        </div>

        <div className="filter-sidebar">
          <div className="filter-header">
            <span>Filters ({activeFilterCount})</span>
            <button className="clear-filters" onClick={handleClearFilters}>Clear all</button>
          </div>
          <div className="filter-group">
            <label>Status</label>
            <select name="status" value={formData.status} onChange={handleChange}>
              <option value="">Select Status</option>
              <option value="Pending Decision">Pending Decision</option>
              <option value="Scheduled">Scheduled</option>
              <option value="Pending Feedback">Pending Feedback</option>
              <option value="Cancelled">Cancelled</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <div className="filter-group">
            <label>Job</label>
            <select name="job" value={formData.job} onChange={handleChange}>
              <option value="">Select</option>
            </select>
          </div>
          <div className="filter-group">
            <label>POC</label>
            <select name="poc" value={formData.poc} onChange={handleChange}>
              <option value="">Select</option>
            </select>
          </div>
          <div className="filter-group">
            <label>Interview Date</label>
            <DatePicker
              selected={interviewDate}
              onChange={handleDateChange}
              dateFormat="yyyy-MM-dd"
              placeholderText="Select Interview Date"
              className="date-picker-input"
            />
          </div>
          <button className="apply-button">Apply filters</button>
        </div>
      </div>

    </div>
  );
}

export default Interviews;
