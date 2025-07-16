import './Profile.css';
import React, { useState } from 'react';
import 'react-phone-input-2/lib/style.css';
import PhoneInput from 'react-phone-input-2';

const Profile = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    Roles: '',
    phone: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    setErrors({ ...errors, [id]: '' }); // Clear error on change
  };

  const handlePhoneChange = (value) => {
    setFormData({ ...formData, phone: value });
    setErrors({ ...errors, phone: '' }); // Clear error on change
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required.';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required.';
    if (!formData.email) newErrors.email = 'Email is required.';
    else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) newErrors.email = 'Enter a valid email.';

    if (!formData.Roles) newErrors.Roles = 'Please select a role.';
    if (!formData.phone || formData.phone.length < 10) newErrors.phone = 'Valid phone number required.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    alert(
      `Profile Saved!\n\nName: ${formData.firstName} ${formData.lastName}\nEmail: ${formData.email}\nRoles: ${formData.Roles}\nPhone: ${formData.phone}`
    );
  };

  return (
    <div className="profile-container">
      <h2>Profile</h2>
      <form onSubmit={handleSubmit} noValidate>
        <label htmlFor="firstName">First Name *</label>
        <input className='inputprofile' type="text" id="firstName" value={formData.firstName} onChange={handleChange} placeholder="Enter first name" />
        {errors.firstName && <p className="error">{errors.firstName}</p>}

        <label htmlFor="lastName">Last Name *</label>
        <input className='inputprofile' type="text" id="lastName" value={formData.lastName} onChange={handleChange} placeholder="Enter last name" />
        {errors.lastName && <p className="error">{errors.lastName}</p>}

        <label htmlFor="email">Email *</label>
        <input className='inputprofile' type="email" id="email" value={formData.email} onChange={handleChange} placeholder="Enter email" />
        {errors.email && <p className="error">{errors.email}</p>}

        <label htmlFor="Roles">Roles *</label>
        <select className='selectProfile' id="Roles" value={formData.Roles} onChange={handleChange}>
          <option value="">Select Roles</option>
          <option value="Admin">Admin</option>
          <option value="Support">Support</option>
          <option value="Other">Other</option>
        </select>
        {errors.Roles && <p className="error">{errors.Roles}</p>}

        <label htmlFor="phone">Phone Number *</label>
        <PhoneInput
          country={'in'}
          value={formData.phone}
          onChange={handlePhoneChange}
          inputProps={{ required: true }}
        />
        {errors.phone && <p className="error">{errors.phone}</p>}

        <button className='btnProfile' type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default Profile;
