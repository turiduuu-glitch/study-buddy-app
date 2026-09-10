import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

function AdminDashboard() {
  const [pendingStudents, setPendingStudents] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchPendingStudents();
  }, []);

  const fetchPendingStudents = async () => {
    try {
      const response = await axios.get(`${API_URL}/admin/pending-students`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPendingStudents(response.data);
    } catch (error) {
      console.error('Error fetching pending students:', error);
    }
  };

  const handleApprove = async (userId) => {
    try {
      await axios.put(`${API_URL}/admin/approve/${userId}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchPendingStudents();
    } catch (error) {
      console.error('Error approving student:', error);
    }
  };

  return (
    <div className="container">
      <h1>Admin Dashboard</h1>
      <h2>Pending Student Approvals</h2>
      <div className="students-list">
        {pendingStudents.map((student) => (
          <div key={student._id} className="student-card">
            <p><strong>Name:</strong> {student.name}</p>
            <p><strong>Email:</strong> {student.email}</p>
            <button onClick={() => handleApprove(student._id)}>Approve</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminDashboard;
