// controllers/ticketController.js
import Ticket from '../models/Ticket.js';

// Create tickets
const createTicket = async (req, res) => {
  let count = 0;
  try {
    const numTickets = Math.floor((Math.random() * 5) + 1);
    console.log(numTickets);
    const userId = req.user.email; // Fetched from the authenticated user
    console.log(userId);

    function insertRandomValues(array) {
      var length = array.length;
      var randomIndexes = [];

      // Generate 5 unique random indexes
      while (randomIndexes.length < 5) {
        var randomIndex = Math.floor(Math.random() * length);
        if (!randomIndexes.includes(randomIndex)) {
          randomIndexes.push(randomIndex);
        }
      }
      console.log('finished random success');

      // Insert values at random indexes
      for (var i = 0; i < randomIndexes.length; i++) {
        var min, max;
        if (randomIndexes[i] === 0) {
          min = 1;
          max = 10;
        } else {
          min = (randomIndexes[i] * 10) + 1;
          max = (randomIndexes[i] + 1) * 10;
        }

        array[randomIndexes[i]] = Math.floor(Math.random() * (max - min + 1)) + min;
      }
      console.log('finished insert success');
      console.log(count++);
    }

    // Create an array of arrays of arrays
    let tickets = [];
    var uniqueValues = new Set();
    for (var j = 0; j < numTickets; j++) {
      let ticket = [];
      for (var k = 0; k < 3; k++) {
        var innerArray = new Array(9).fill(0);
        insertRandomValues(innerArray);

        // Ensure unique non-zero values
        for (var l = 0; l < innerArray.length; l++) {
          if (innerArray[l] !== 0) {
            while (uniqueValues.has(innerArray[l])) {
              innerArray[l] = Math.floor(Math.random() * 90) + 10;
            }
            uniqueValues.add(innerArray[l]);
          }
        }

        ticket.push(innerArray);
      }
      tickets.push(ticket);
    }
    console.log('finished create success');

    // Create a new ticket document
    const ticket = new Ticket({
      userId: userId,
      ticketArray: tickets,
    });

    // Save the ticket to the database
    ticket.save();

    res.status(201).json({ message: 'Tickets created successfully', data: ticket._id });
  } catch (error) {
    console.error('Error creating tickets:', error);
    res.status(500).json({ error: 'Failed to create tickets' });
  }
};

// Fetch tickets with pagination
const fetchTicket = async (req, res) => {
  try {
    const page = req.query.page || 1; // Current page number
    const limit = req.query.limit || 2; // Number of results per page

    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);

    // Calculate skip count
    const skipCount = (pageNumber - 1) * limitNumber;

    // Fetch paginated tickets from MongoDB
    const tickets = await Ticket.find().skip(skipCount).limit(limitNumber);

    console.log(tickets);
    // Calculate total count and total pages
    const totalCount = await Ticket.countDocuments();
    const totalPages = Math.ceil(totalCount / limitNumber);

    res.json({
      tickets,
      totalPages,
      currentPage: page,
    });
  } catch (error) {
    console.error('Error fetching ticket:', error);
    res.status(500).json({ error: 'Failed to fetch ticket' });
  }
};

export { createTicket, fetchTicket };
