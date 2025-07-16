import React, { useState } from 'react';
import './userstyle.css';
import { FaEdit, FaBan } from 'react-icons/fa';
import AddUser from './adduser';
const Users = () => {
  const [activeTab, setActiveTab] = useState('users');
  const [showModal, setShowModal] = useState(false);
  const [users, setUsers] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const handleAddUser = (newUser) => {
    const initials = (
      (newUser.firstName?.[0] || '') + (newUser.lastName?.[0] || '')
    ).toUpperCase();
    const permissionDate = new Date().toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
    const userData = {
      initials,
      name: `${newUser.firstName} ${newUser.lastName}`,
      email: newUser.email,
      role: newUser.role,
      permissionDate,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      phone: newUser.phone,
    };
    if (editingIndex !== null) {
      // Update existing user
      const updatedUsers = [...users];
      updatedUsers[editingIndex] = userData;
      setUsers(updatedUsers);
      setEditingIndex(null);
    } else {
      // Add new user
      setUsers((prevUsers) => [...prevUsers, userData]);
    }
    setShowModal(false);
  };
  const handleEditUser = (index) => {
    setEditingIndex(index);
    setShowModal(true);
  };
  const handleDeleteUser = (index) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter((_, i) => i !== index));
    }
  };
  return (
    <div className="settings-container">
      <h2>Settings</h2>
      <div className="tabs">
        <button
          className={activeTab === 'users' ? 'active-tab' : 'disabled-tab'}
          onClick={() => setActiveTab('users')}
        >
          Users {users.length}
        </button>
        <button
          className={activeTab === 'report' ? 'active-tab' : 'disabled-tab'}
          onClick={() => setActiveTab('report')}
        >
          Report Access 0
        </button>
      </div>
      {activeTab === 'users' && (
        <>
          <div className="table-header">
            <div className="add-user-btn" onClick={() => {
              setEditingIndex(null);
              setShowModal(true);
            }}>
              + Add User
            </div>
          </div>
          <table className="users-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Roles</th>
                <th>Permission Granted</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index}>
                  <td>
                    <div className="user-info">
                      <div className="avatar">{user.initials}</div>
                      <div>{user.name}</div>
                    </div>
                  </td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>{user.permissionDate}</td>
                  <td>
                    <FaEdit className="icon-user edit-user" onClick={() => handleEditUser(index)} />
                    <FaBan className="icon-user ban-user" onClick={() => handleDeleteUser(index)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {showModal && (
            <AddUser
              onClose={() => {
                setShowModal(false);
                setEditingIndex(null);
              }}
              onAddUser={handleAddUser}
              editData={editingIndex !== null ? users[editingIndex] : null}
            />
          )}
        </>
      )}
      {activeTab === 'report' && (
        <div style={{ paddingTop: '20px', color: 'gray' }}>
          <p>No report access available at the moment.</p>
        </div>
      )}
    </div>
  );
};
export default Users;
