// CreateJobPage.js
import React, { useState } from 'react';
import './CreateJobPage.css';
import Form from './form';

const CreateJobPage = () => {
  const [Domain, setDomain] = useState('');
  const [status, setStatus] = useState('active');
  const [category, setCategory] = useState('');
  const [hiringManager, setHiringManager] = useState('');
  const [recruiter, setRecruiter] = useState('');
  const [activeCandidatesPresent, setActiveCandidatesPresent] = useState('');
  const [jobId, setJobId] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [submittedFormData, setSubmittedFormData] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Filters Applied!');
  };

  const handleClear = () => {
    setDomain('');
    setStatus('active');
    setCategory('');
    setHiringManager('');
    setRecruiter('');
    setActiveCandidatesPresent('');
    setJobId('');
  };

  const handleFormSubmit = (formData) => {
    setSubmittedFormData(formData);
    setShowForm(false);
  };

  if (showForm) {
    return <Form onSubmitJob={handleFormSubmit} />;
  }

  return (
    <div className="create-job-container">
      <div className="header-row">
        <h2 className="jobs-title">Jobs</h2>
        <div className="add-user-btnJob" onClick={() => setShowForm(true)}>+ Create New Job</div>
      </div>

      <div className="search-filter-row">
        {/* LEFT SIDE */}
        <div className="left-panel">
          <div className="search-summary-sort">
            <div className="search-box">
              <span role="img" aria-label="search" className="search-iconcreatejobpage">🔍</span>
              <input
                type="text"
                placeholder="Search by job name"
                className="search-input"
              />
            </div>

            <div className="job-meta">
              <span className='text-meta'>Showing {submittedFormData ? 1 : 0} jobs</span>
              <select className="sort-dropdownJobpage">
                <option>Active Candidates: High to Low</option>
                <option>Active Candidates: Low to High</option>
                <option>Job Roll Name: A to Z</option>
                <option>Job Roll Name: Z to A</option>
              </select>
            </div>
          </div>

          {/* JOB CARD */}
          {submittedFormData && (
            <div className="job-card">
              <h3>
                {submittedFormData.jobRole} – <span style={{ color: 'green' }}>Active</span>
              </h3>
              <p>{submittedFormData.techStackDetails || 'No tech stack provided'}</p>
              <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                <button className="view-btn">View</button>
                <button className="add-candidate-btn">Add Candidate</button>
              </div>
              <div style={{ marginTop: '10px', fontSize: '14px', color: '#555' }}>
                <span>Recruiter: {submittedFormData.spocEmail || 'RJ'}</span> &nbsp;|&nbsp;
                <span>Hiring Manager: {submittedFormData.hiringManagerEmail || 'HM'}</span>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT SIDE: FILTERS */}
        <div className="card">
          <form onSubmit={handleSubmit}>
            <div className="form-header">
              <h2 style={{ color: 'blue' }}>Filters</h2>
              <button type="button" onClick={handleClear} className="clear-btn">
                Clear All
              </button>
            </div>

            <div className="form-group">
              <label>Domain</label>
              <select value={Domain} onChange={(e) => setDomain(e.target.value)}>
                <option value="">Select Domain</option>
                <option value="Firmware Development">Firmware Development</option>
                <option value="EV Electronics">EV Electronics</option>
                <option value="System Requirement Management">System Requirement Management</option>
                <option value="EV Testing">EV Testing</option>
                <option value="EV Motor & Motor Control">EV Motor & Motor Control</option>
                <option value="Admission Interview at PST 2025">Admission Interview at PST 2025</option>
                <option value="Service Now">Service Now</option>
                <option value="Robotic Process Automation">Robotic Process Automation</option>
                <option value="EV Vehicle integration">EV Vehicle integration</option>
                <option value="ICE EE Integration">ICE EE Integration</option>
                <option value="Flutter">Flutter</option>
                <option value="Cyber Security">Cyber Security</option>
                <option value="Wordpress Engineer(Backend)">Wordpress Engineer(Backend)</option>
                <option value="Wordpress Engineer(Frontend)">Wordpress Engineer(Frontend)</option>
                <option value="Business Analyst">Business Analyst</option>
                <option value="Finacle Development">Finacle Development</option>
                <option value="SAP">SAP</option>
                <option value="Solution Architect">Solution Architect</option>
                <option value="Marketing">Marketing</option>
                <option value="Data Engineering (Service)">Data Engineering (Service)</option>
                <option value="Devops (Service)">Devops (Service)</option>
                <option value="Fixed Question Trained">Fixed Question Trained</option>
                <option value="Sales">Sales</option>
                <option value="Gaming">Gaming</option>
                <option value="Web 3.0">Web 3.0</option>
                <option value="Program Management">Program Management</option>
                <option value="Frontend Web">Frontend Web</option>
                <option value="React Native Development">React Native Development</option>
                <option value="Full-Stack Development (Service)">Full-Stack Development (Service)</option>
                <option value="Data Analytics">Data Analytics</option>
                <option value="UI/UX Design">UI/UX Design</option>
                <option value="Software Development Engineering">Software Development Engineering</option>
                <option value="Data Science">Data Science</option>
                <option value="Product Management">Product Management</option>
                <option value="Software DevOps">Software DevOps</option>
                <option value="Operations">Operations</option>
                <option value="Full-Stack Development">Full-Stack Development</option>
                <option value="Data Engineering">Data Engineering</option>
                <option value="Database Administrator">Database Administrator</option>
                <option value="Salesforce Development">Salesforce Development</option>
                <option value="Quality Assurance">Quality Assurance</option>
                <option value="Fullstack(Frontend Major)">Fullstack(Frontend Major)</option>
                <option value="Fullstack(Backend Major)">Fullstack(Backend Major)</option>
                <option value="SDET">SDET</option>
                <option value="SAP Development">SAP Development</option>
                <option value="Business Development">Business Development</option>
                <option value="JAVA Development">JAVA Development</option>
                <option value="Angular Development">Angular Development</option>
                <option value="Android Development">Android Development</option>
                <option value="Dot-net Development">Dot-net Development</option>
                <option value="iOS Development">iOS Development</option>
                <option value="System Embedded Development">System Embedded Development</option>
                <option value="Cross-Platform Mobile Development">Cross-Platform Mobile Development</option>
                <option value="Robotic Embedded Development">Robotic Embedded Development</option>
                <option value="Software Backend Development">Software Backend Development</option>
                <option value="React JS Development">React JS Development</option>
                <option value="Python Development">Python Development</option>
                <option value="Project Management">Project Management</option>
              </select>
            </div>

            <div className="form-group">
              <label>Status</label>
              <select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="draft">Draft</option>
              </select>
            </div>

            <div className="form-group">
              <label>Category</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="">Select Category</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
                <option value="E">E</option>
                <option value="F">F</option>
              </select>
            </div>

            <div className="form-group">
              <label>Hiring Manager</label>
              <input
                list="hiringManagerList"
                type="text"
                value={hiringManager}
                onChange={(e) => setHiringManager(e.target.value)}
                placeholder="Select or type"
              />
              <datalist id="hiringManagerList">
                <option value="No Options" />
              </datalist>
            </div>

            <div className="form-group" style={{ position: 'relative' }}>
              <label>Recruiter</label>
              <input
                type="text"
                value={recruiter}
                onChange={(e) => setRecruiter(e.target.value)}
                placeholder="Enter recruiter name or email"
                style={{ paddingRight: '24px' }}
              />
              <span style={{
                position: 'absolute',
                right: '10px',
                top: '36px',
                pointerEvents: 'none',
                fontSize: '14px',
                color: '#555'
              }}>▼</span>
            </div>

            <div className="form-group">
              <label>Active Candidates Present</label>
              <select value={activeCandidatesPresent} onChange={(e) => setActiveCandidatesPresent(e.target.value)}>
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            <div className="form-group">
              <label>Job ID</label>
              <input
                type="text"
                value={jobId}
                onChange={(e) => setJobId(e.target.value)}
                placeholder="Enter Job ID"
              />
            </div>

            <div style={{ textAlign: 'right' }}>
              <button type="submit" className="clear-btn">Apply Filter</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateJobPage;
