import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from './config';
import './App.css'; // ✅ import the CSS below

export default function App({ token }) {
  const [tickets, setTickets] = useState([]);
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const fetchUserAndTickets = async () => {
      try {
        const [userRes, ticketsRes] = await Promise.all([
          axios.get(`${API_URL}/auth/me`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${API_URL}/api/tickets`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setUser(userRes.data);
        setTickets(ticketsRes.data);
      } catch (err) {
        console.error('Error loading data:', err);
        setError('Failed to fetch user or tickets');
      }
    };

    if (token) {
      fetchUserAndTickets();
    }
  }, [token]);

  const handleAdminStats = async () => {
    try {
      const res = await axios.get(`${API_URL}/admin/stats`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert(`📊 Admin stats:\n${JSON.stringify(res.data, null, 2)}`);
    } catch (err) {
      console.error('Stats error:', err);
      alert('❌ Access denied to stats');
    }
  };

  const handleCreateTicket = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${API_URL}/api/tickets`,
        { title, description },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setTickets((prev) => [...prev, res.data]);
      setTitle('');
      setDescription('');
    } catch (err) {
      console.error('Ticket creation error:', err);
      alert('❌ Failed to create ticket');
    }
  };

  return (
    <div className="app-container">
      <div className="card">
        <h2 className="title">🎫 Support Tickets</h2>

        {user && (
          <p className="welcome">
            Welcome, <strong>{user.name}</strong> <span className="role">({user.role})</span>
          </p>
        )}

        {user?.role === 'admin' && (
          <button className="admin-btn" onClick={handleAdminStats}>
            🔍 View Admin Stats
          </button>
        )}

        {error && <p className="error">{error}</p>}

        <form className="form" onSubmit={handleCreateTicket}>
          <h3>Create New Ticket</h3>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            required
          />
          <button type="submit">➕ Submit Ticket</button>
        </form>

        <ul className="ticket-list">
          {tickets.length > 0 ? (
            tickets.map((ticket) => (
              <li key={ticket._id}>
                <strong>{ticket.title}</strong> — {ticket.status}
              </li>
            ))
          ) : (
            <p className="no-tickets">No tickets found.</p>
          )}
        </ul>
      </div>
    </div>
  );
}
