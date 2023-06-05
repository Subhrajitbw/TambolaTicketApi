import {body, query} from 'express-validator';

const createTickets = [
    body('ticketArray').isArray().withMessage('Ticket array must be an array'),
  ];
  
const fetchTickets = [
    query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
    query('limit').optional().isInt({ min: 1 }).withMessage('Limit must be a positive integer'),
  ];

  export {createTickets, fetchTickets}