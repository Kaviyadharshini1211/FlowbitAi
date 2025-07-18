// routes/webhook.js
const express = require('express');
const router = express.Router();
const Ticket = require('../models/Ticket');

// This endpoint is called by n8n to mark a ticket as done
router.post('/ticket-done', async (req, res) => {
  try {
    const { ticketId } = req.body;
    if (!ticketId) return res.status(400).json({ message: 'ticketId required' });

    const ticket = await Ticket.findByIdAndUpdate(ticketId, { status: 'done' }, { new: true });
    if (!ticket) return res.status(404).json({ message: 'Ticket not found' });

    console.log('✅ Ticket marked done by n8n:', ticketId);
    res.json(ticket);
  } catch (err) {
    console.error('❌ Webhook error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
