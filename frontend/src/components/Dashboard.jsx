import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

function Dashboard() {
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [units, setUnits] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      const response = await axios.get(`${API_URL}/students/subjects`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSubjects(response.data);
    } catch (error) {
      console.error('Error fetching subjects:', error);
    }
  };

  const handleSelectSubject = (subject) => {
    setSelectedSubject(subject);
    setUnits(subject.units || []);
  };

  return (
    <div className="container">
      <h1>Study Dashboard</h1>
      <div className="dashboard">
        <div className="subjects-list">
          <h2>Subjects</h2>
          {subjects.map((subject) => (
            <button key={subject._id} onClick={() => handleSelectSubject(subject)}>
              {subject.name}
            </button>
          ))}
        </div>
        {selectedSubject && (
          <div className="units-list">
            <h2>{selectedSubject.name} - Units</h2>
            {units.map((unit) => (
              <div key={unit._id} className="unit-card">
                <h3>{unit.name}</h3>
                <p>{unit.description}</p>
                <button onClick={() => window.location.href = `/unit/${unit._id}`}>View Details</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
