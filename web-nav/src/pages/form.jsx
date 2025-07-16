import React, { useState } from 'react';
import './formstyle.css';
const Form = ({ onSubmitJob }) => {
  const [formData, setFormData] = useState({
    jobRole: '',
    companyName: '',
    spocEmail: '',
    hiringManagerEmail: '',
    teamSize: '',
    numberOfHires: '',
    icOrManager: '',
    process: '',
    techStackDetails: '',
    jdFile: null,
  });
  const [errors, setErrors] = useState({
    spocEmail: 'Email is required',
    hiringManagerEmail: 'Email is required',
  });
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.trim() === '') {
      return 'Email is required';
    } else if (!emailRegex.test(email)) {
      return 'Invalid email address';
    } else {
      return '';
    }
  };
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'jdFile') {
      setFormData((prev) => ({ ...prev, jdFile: files[0] }));
      return;
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Validate email fields live
    if (name === 'spocEmail' || name === 'hiringManagerEmail') {
      const errorMsg = validateEmail(value);
      setErrors((prev) => ({ ...prev, [name]: errorMsg }));
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmitJob) {
      onSubmitJob(formData);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="form-containerform">
      <h2 className="form-title">Please fill the details</h2>
      <div className="form-grid">
        <div>
          <label>Job Role *</label>
          <input
            type="text"
            name="jobRole"
            value={formData.jobRole}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Company Name *</label>
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>SPOC Email *</label>
          <input
            type="email"
            name="spocEmail"
            value={formData.spocEmail}
            onChange={handleChange}
            required
          />
          {errors.spocEmail && (
            <p className="error-message">{errors.spocEmail}</p>
          )}
        </div>
        <div>
          <label>Hiring Manager Email ID *</label>
          <input
            type="email"
            name="hiringManagerEmail"
            value={formData.hiringManagerEmail}
            onChange={handleChange}
            required
          />
          {errors.hiringManagerEmail && (
            <p className="error-message">{errors.hiringManagerEmail}</p>
          )}
        </div>
        <div>
          <label>Team Size *</label>
          <input
            type="number"
            name="teamSize"
            value={formData.teamSize}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Number of Hires *</label>
          <input
            type="number"
            name="numberOfHires"
            value={formData.numberOfHires}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>IC or Manager *</label>
          <input
            type="text"
            name="icOrManager"
            value={formData.icOrManager}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Process *</label>
          <input
            type="text"
            name="process"
            value={formData.process}
            onChange={handleChange}
            required
          />
        </div>
        <div className="full-width">
          <label>Tech Stack Details *</label>
          <input
            type="text"
            name="techStackDetails"
            value={formData.techStackDetails}
            onChange={handleChange}
            required
          />
        </div>
        <div className="full-width">
          <label>JD File *</label>
          <input
            type="file"
            name="jdFile"
            onChange={handleChange}
            required
          />
        </div>
        <div className="submit-btn-container">
          <button className='buttonform' type="submit">Submit Job</button>
        </div>
      </div>
    </form>
  );
};
export default Form;