const Ticket = require('../models/Ticket');

// ✅ GET /api/tickets
// Admins get all tickets; users get only their own tenant's tickets
exports.getTickets = async (req, res) => {
  try {
    const { role, customerId } = req.user;

    // 👇 Admins can see everything; others only their own tenant's tickets
    const filter = role === 'admin' ? {} : { customerId };

    const tickets = await Ticket.find(filter);
    res.status(200).json(tickets);
  } catch (err) {
    console.error('❌ Error fetching tickets:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// ✅ POST /api/tickets
// Creates a ticket under the logged-in user's tenant
exports.createTicket = async (req, res) => {
  try {
    const { title, description } = req.body;
    const { customerId, userId } = req.user;

    const newTicket = new Ticket({
      title,
      description,
      customerId,     // 🔒 Enforce tenant from JWT
      createdBy: userId,
    });

    const savedTicket = await newTicket.save();
    res.status(201).json(savedTicket);
  } catch (err) {
    console.error('❌ Error creating ticket:', err);
    res.status(500).json({ message: 'Error creating ticket' });
  }
};
