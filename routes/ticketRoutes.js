import express from'express';
import {createTicket, fetchTicket} from '../controller/ticketController.js';
import { createTickets, fetchTickets } from'../validators/ticketValidator.js';
import { authenticateToken } from'../middleware/authMiddleware.js';
// import { checkTicketOwnership } from'../middlewares/ticketMiddleware.js';

const router = express.Router();

// POST /api/tickets
router.post('/create-tickets', authenticateToken, createTickets, createTicket);

// GET /api/tickets/:ticketId
router.get('/get-tickets', authenticateToken, fetchTickets, fetchTicket);

export default router;
