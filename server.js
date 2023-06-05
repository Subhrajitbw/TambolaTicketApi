import express from 'express';
import bodyParser from 'body-parser';
import connection from "./database/connection.js";
import authRoutes from './routes/authRoutes.js';
import ticketRoutes from './routes/ticketRoutes.js';

const app = express();

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Start the server
app.listen(3000, () => {
    console.log('Server Started at port 3000');
});

// Connect to the database
connection();

// Register authentication routes
app.use('/api/auth', authRoutes);

// Register ticket routes
app.use('/api/ticket', ticketRoutes);
