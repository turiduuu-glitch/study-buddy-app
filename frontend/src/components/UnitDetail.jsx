import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

function UnitDetail() {
  const { unitId } = useParams();
  const [unit, setUnit] = useState(null);
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchUnit();
    fetchHistory();
  }, [unitId]);

  const fetchUnit = async () => {
    try {
      const response = await axios.get(`${API_URL}/students/units/${unitId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUnit(response.data);
    } catch (error) {
      console.error('Error fetching unit:', error);
    }
  };

  const fetchHistory = async () => {
    try {
      const response = await axios.get(`${API_URL}/ai/history/${unitId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching history:', error);
    }
  };

  const handleAskAI = async (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    try {
      const response = await axios.post(
        `${API_URL}/ai/ask`,
        { userMessage: userInput, unitId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessages([...messages, response.data]);
      setUserInput('');
    } catch (error) {
      console.error('Error asking AI:', error);
    }
  };

  if (!unit) return <div>Loading...</div>;

  return (
    <div className="container">
      <h1>{unit.name}</h1>
      <div className="unit-content">
        <div className="report">
          <h2>Detailed Report</h2>
          <p>{unit.content}</p>
        </div>
        <div className="ai-chat">
          <h2>AI Tutor</h2>
          <div className="messages">
            {messages.map((msg, idx) => (
              <div key={idx} className="message">
                <p><strong>You:</strong> {msg.userMessage}</p>
                <p><strong>AI:</strong> {msg.aiResponse}</p>
              </div>
            ))}
          </div>
          <form onSubmit={handleAskAI}>
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Ask a question..."
            />
            <button type="submit">Send</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UnitDetail;
