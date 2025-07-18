import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Tickets() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/tickets', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTickets(res.data);
    };
    fetchTickets();
  }, []);

  return (
    <div>
      <h2>Your Tickets</h2>
      <ul>
        {tickets.map(ticket => (
          <li key={ticket._id}>
            <strong>{ticket.title}</strong> - {ticket.status}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Tickets;
