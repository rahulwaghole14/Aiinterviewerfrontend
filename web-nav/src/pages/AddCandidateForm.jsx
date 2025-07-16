import React, { useState, useRef } from 'react';
import './AddCandidateForm.css';
function AddCandidateForm() {
  const [formData, setFormData] = useState({
    domain: '',
    jobRole: '',
    email: '',
    resumes: [],
  });
  const [candidates, setCandidates] = useState([]);
  const [showMessage, setShowMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const fileInputRef = useRef(null);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleResumeChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 15);
    setFormData((prev) => ({ ...prev, resumes: files }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const { domain, jobRole, email, resumes } = formData;
    if (!domain || !jobRole || !email || resumes.length === 0) {
      setErrorMessage('Please fill all fields and upload at least one resume.');
      return;
    }
    setErrorMessage('');
    setCandidates((prev) => [...prev, formData]);
    setShowMessage(true);
    setFormData({
      domain: '',
      jobRole: '',
      email: '',
      resumes: [],
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setTimeout(() => {
      setShowMessage(false);
    }, 2000);
  };
  return (
    <div className="add-candidate-page">
      <h2 className="page-title">Add New Candidate</h2>
      <div className="candidate-body">
        <div className="form-section">
          <form id="candidateForm" onSubmit={handleSubmit}>
            <div className="form-box">
              <label>Domain</label>
              <select name="domain" value={formData.domain} onChange={handleChange}>
                <option value="">Select Domain</option>
                <option>Cloud Engineering</option>
                <option>Testing</option>
                <option>Data Science</option>
                <option>Product Management</option>
                <option>Project Management</option>
                <option>UI/UX Design</option>
                <option>Software Development</option>
                <option>Cyber Security</option>
                <option>Technical Support</option>
                <option>Networking and Infrastructure</option>
              </select>
              <label>Job Role</label>
              <select name="jobRole" value={formData.jobRole} onChange={handleChange}>
                <option value="">Select Job Role</option>
                <option>FrontEnd Developer</option>
                <option>BackEnd Developer</option>
                <option>Full Stack Developer</option>
                <option>Software Engineer</option>
                <option>QA Engineer</option>
                <option>Data Engineer</option>
                <option>Test Lead</option>
                <option>Technical Support Executive</option>
              </select>
              <label>POC Email</label>
              <input
                type="email"
                name="email"
                placeholder="POC Email"
                value={formData.email}
                onChange={handleChange}
              />
              <div className="resume-upload">
                <p>Upload Resumes (Max 15)</p>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  multiple
                  ref={fileInputRef}
                  onChange={handleResumeChange}
                />
              </div>
              {errorMessage && <div className="erroraddcandidate-msg">⚠️ {errorMessage}</div>}
              {showMessage && <div className="success-msg">✅ Candidate successfully added!</div>}
            </div>
          </form>
        </div>
        <div className="preview-section">
          <div className="status-row">
            <div className="status-box">{candidates.length} Total profiles</div>
            <div className="status-box erroraddcandidate">0 Errors</div>
          </div>
          <div className="table-box">
            <table className="candidate-table">
              <thead>
                <tr>
                  <th>Candidate name</th>
                  <th>Email address</th>
                  <th>Phone number</th>
                  <th>Work experience</th>
                  <th>Resume</th>
                </tr>
              </thead>
              <tbody>
                <tr className="upload-label-row">
                  <td colSpan="5" className="upload-label">
                    Upload Resume (max 15) To Add New Candidates
                  </td>
                </tr>
                {candidates.map((candidate, index) => (
                  <tr key={index}>
                    <td>{candidate.jobRole}</td>
                    <td>{candidate.email}</td>
                    <td>—</td>
                    <td>{candidate.domain}</td>
                    <td>
                      {candidate.resumes.length > 0
                        ? candidate.resumes.map((file) => file.name).join(', ')
                        : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="right-submit">
            <button className="submit-btn" type="submit" form="candidateForm">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default AddCandidateForm;