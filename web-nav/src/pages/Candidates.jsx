import React, { useState, useEffect } from "react";
import { PlusCircle, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./CandidatePage.css";

const initialCandidates = [
  {
    id: 1,
    name: "Rohit Sharma",
    email: "rohit.sharma@example.com",
    role: "Software Engineer",
    domain: "Backend",
    status: "Requires Action",
    lastUpdated: "2025-06-26",
    evaluation: null,
  },
  {
    id: 2,
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Frontend Developer",
    domain: "Frontend",
    status: "BR Evaluated",
    lastUpdated: "2025-06-25",
    evaluation: { score: 8.5, result: "Pass" },
  },
];

const statusList = [
  "All",
  "Requires Action",
  "Pending Scheduling",
  "BR In Process",
  "BR Evaluated",
  "Internal Interviews",
  "Offered",
  "Hired",
  "Rejected",
  "Offer Rejected",
  "Cancelled",
];

const sortOptions = [
  "Score: Low to High",
  "Score: High to Low",
  "Candidate: A to Z",
  "Candidate: Z to A",
  "Start Date: Ascending",
  "Start Date: Descending",
];

const CandidateCard = ({ candidate }) => (
  <div className="candidate-card">
    <div className="card-headercandidate">
      <div>
        <strong className="candidate-name">{candidate.name}</strong>
        <div className="candidate-role">{candidate.role}</div>
        <div className="candidate-updated">
          Last updated:{" "}
          {new Date(candidate.lastUpdated).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </div>
      </div>
      <div className="candidate-status">
        <span
          className={`badge ${
            candidate.status === "Requires Action"
              ? "badge-warning"
              : "badge-success"
          }`}
        >
          {candidate.status}
        </span>
      </div>
    </div>
    {candidate.evaluation && (
      <div className="evaluation-section">
        <span className="eval-score">{candidate.evaluation.score}/10</span>
        <span className="eval-result">{candidate.evaluation.result}</span>
        <button className="view-report">View Report</button>
      </div>
    )}
  </div>
);

const CandidatePage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [filteredCandidates, setFilteredCandidates] = useState(initialCandidates);
  const [sortOption, setSortOption] = useState("Start Date: Ascending");

  const countByStatus = (status) =>
    status === "All"
      ? initialCandidates.length
      : initialCandidates.filter((c) => c.status === status).length;

  useEffect(() => {
    let filtered = initialCandidates.filter((candidate) => {
      const matchesSearch =
        candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        candidate.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        selectedStatus === "All" || candidate.status === selectedStatus;
      return matchesSearch && matchesStatus;
    });

    switch (sortOption) {
      case "Score: Low to High":
        filtered.sort((a, b) => (a.evaluation?.score || 0) - (b.evaluation?.score || 0));
        break;
      case "Score: High to Low":
        filtered.sort((a, b) => (b.evaluation?.score || 0) - (a.evaluation?.score || 0));
        break;
      case "Candidate: A to Z":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "Candidate: Z to A":
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "Start Date: Ascending":
        filtered.sort((a, b) => new Date(a.lastUpdated) - new Date(b.lastUpdated));
        break;
      case "Start Date: Descending":
        filtered.sort((a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated));
        break;
      default:
        break;
    }

    setFilteredCandidates(filtered);
  }, [searchTerm, selectedStatus, sortOption]);

  return (
    <div className="candidate-page-wrapper">
      <button
        className="btn-add-candidate-fixed"
        onClick={() => navigate("/add-candidates")}
      >
        <PlusCircle size={12} style={{ marginRight: "5px" }} /> Add Candidate
      </button>

      <div className="header-section">
        <h2>Candidates</h2>
      </div>

      <div className="status-bar-row">
        {statusList.map((status) => (
          <div
            key={status}
            className={`status-tab status-${status.toLowerCase().replace(/\s/g, "-")} ${
              selectedStatus === status ? "active" : ""
            }`}
            onClick={() => setSelectedStatus(status)}
          >
            <span className="count-badge">{countByStatus(status)}</span>
            <span>{status}</span>
          </div>
        ))}
      </div>

      <div className="main-section">
        <div className="actions">
          <input
            type="text"
            placeholder="Candidate name or email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span>Showing {filteredCandidates.length} candidates</span>
          <span className="btn-export" title="Export">
            <Download size={16} style={{ marginRight: "5px" }} /> Export
          </span>
          <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
            {sortOptions.map((opt) => (
              <option key={opt}>{opt}</option>
            ))}
          </select>
        </div>

        <div className="candidate-list">
          {filteredCandidates.map((candidate) => (
            <CandidateCard key={candidate.id} candidate={candidate} />
          ))}
        </div>
      </div>

      <div className="filter-sidebar">
        <div className="sidebar-header">
          <h3>Filters (0)</h3>
          <span className="clear-all">Clear all</span>
        </div>

        <div className="filter-form">
          {["Domain", "Job Role", "Evaluation Includes"].map((label) => (
            <div className="filter-row" key={label}>
              <label>{label}</label>
              <select>
                <option>Select {label}</option>
              </select>
            </div>
          ))}

          <div className="filter-row">
            <label>Point of Contact (POC)</label>
            <input type="text" placeholder="Enter Point of Contact (POC)" />
          </div>

          <div className="filter-row">
            <label>Application Start Date</label>
            <input type="date" />
          </div>

          <div className="filter-row">
            <label>Last Status Update Date</label>
            <input type="date" />
          </div>

          <div className="filter-row">
            <label>For score</label>
            <select>
              <option>Less than</option>
              <option>Greater than</option>
              <option>Between</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidatePage;
