import React, { useState } from 'react';
import './adduserstyle.css';
import 'react-phone-input-2/lib/style.css';
import PhoneInput from 'react-phone-input-2';
const AddUser = ({ onClose, onAddUser, editData = null }) => {
const [formData, setFormData] = useState({
  email: editData?.email || '',
  role: editData?.role || '',
  firstName: editData?.firstName || '',
  lastName: editData?.lastName || '',
  phone: editData?.phone || '',
});
  const [errors, setErrors] = useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.role) newErrors.role = 'Role is required';
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      alert('Please fill in all required fields.');
      return;
    }
    onAddUser(formData);
  };
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Add User</h3>
          <button className="close-btn-adduser" onClick={onClose}>
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <label>Email<span>*</span></label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? 'input-error' : ''}
          />
          {errors.email && <p className="error-text">{errors.email}</p>}
          <label>Select Role<span>*</span></label>
          <div className="checkbox-group-adduser">
            <label>
              <input
                type="radio"
                name="role"
                value="Admin"
                checked={formData.role === 'Admin'}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              />
              Admin
            </label>
            <label>
              <input
                type="radio"
                name="role"
                value="Sourcing Partner"
                checked={formData.role === 'Sourcing Partner'}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              />
              Sourcing Partner
            </label>
          </div>
          {errors.role && <p className="error-text">{errors.role}</p>}
          <div className="name-fields-adduser">
            <div>
              <label>First Name<span>*</span></label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={errors.firstName ? 'input-error' : ''}
              />
              {errors.firstName && <p className="error-text">{errors.firstName}</p>}
            </div>
            <div>
              <label>Last Name<span>*</span></label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className={errors.lastName ? 'input-error' : ''}
              />
              {errors.lastName && <p className="error-text">{errors.lastName}</p>}
            </div>
          </div>
          <label>Phone Number<span>*</span></label>
          <PhoneInput
            country={'in'}
            value={formData.phone}
            onChange={(phone) => setFormData({ ...formData, phone })}
            inputStyle={{ width: '100%' }}
            containerClass={errors.phone ? 'input-error' : ''}
          />
          {errors.phone && <p className="error-text">{errors.phone}</p>}
          <button type="submit" className="submit-btn-adduser">Add</button>
        </form>
      </div>
    </div>
  );
};
export default AddUser;