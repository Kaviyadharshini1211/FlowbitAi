const axios = require('axios');

exports.triggerWorkflow = async (ticket, customerId) => {
  await axios.post(process.env.N8N_WEBHOOK_URL, {
    ticketId: ticket._id,
    customerId,
    title: ticket.title
  });
};
