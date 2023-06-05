import Ticket from '../models/Ticket.js';

// Middleware function to check ticket ownership
const checkTicketOwnership = async (req, res, next) => {
  try {
    const ticketId = req.params.ticketId;

    // Find the ticket by ID
    const ticket = await Ticket.findById(ticketId, { ticketArray: 3 });

    // Check if the ticket exists
    if (!ticket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }

    // Store the ticket in the request object
    req.ticket = ticket;
    next();
  } catch (error) {
    console.error('Error checking ticket ownership:', error);
    res.status(500).json({ error: 'Failed to check ticket ownership' });
  }
};

export { checkTicketOwnership };
