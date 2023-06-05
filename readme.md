# Tambola Ticket Generation

## Introduction
The Tambola Ticket Generation project is a web application that allows users to generate Tambola (also known as Housie or Bingo) tickets. The application provides a user-friendly interface for generating and viewing tickets.

## Features
- User registration and authentication
- Generate Tambola tickets with random numbers
- View and search for generated tickets
- Pagination and limiting of ticket results
- Error handling and validation
- API endpoints for ticket generation and retrieval

## Technologies Used
- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Tokens (JWT)
- bcrypt
- body-parser
- Postman

## Installation
1. Clone the project repository from [GitHub]([https://github.com/your-repo-link](https://github.com/Subhrajitbw/TambolaTicketApi)).
2. Install Node.js, MongoDB is already Connected to Personal Cluster.
3. Navigate to the project directory in the terminal.
4. Run the command `npm install` to install the project dependencies.
5. Create a `.env` file in the project root directory and configure environment variables (e.g., database connection details, JWT secret).
6. Start the application by running `node server.js`.
7. The server should start running on `http://localhost:3000`.

## Usage
1. Register a user account using the `/api/auth/register` endpoint.
2. Log in to obtain an authentication token using the `/api/auth/login` endpoint.
3. Use the obtained token in the request headers (`Authorization: Bearer <token>`) for all protected routes.
4. Generate Tambola tickets using the `/api/ticket/generate` endpoint.
5. View and search for generated tickets using the `/api/ticket` endpoint.
6. Paginate and limit the ticket results using the query parameters `page` and `limit`.

## API Endpoints
- POST `/api/auth/register`: Register a new user.
- POST `/api/auth/login`: Log in and obtain an authentication token.
- POST `/api/ticket/create-tickets`: Generate Tambola tickets.
- GET `/api/ticket/get-tickets`: Fetch paginated and limited tickets.

## Data Models
- User: Represents a registered user with email and hashed password fields.
- Ticket: Represents a Tambola ticket with the user ID and ticket array fields.

## Error Handling
The application provides appropriate error handling mechanisms for various scenarios such as validation errors, duplicate entries, unauthorized access, and server errors. The API endpoints return descriptive error messages and appropriate HTTP status codes.

## Security
The project incorporates security measures to protect user data and ensure secure communication. It uses JWT for authentication and authorization, bcrypt for password hashing, and protects against common security vulnerabilities like SQL injection and cross-site scripting (XSS).

## Future Enhancements
The Tambola Ticket Generation project can be further enhanced with the following features:
- Ticket editing and deletion functionality
- Ticket sharing with other users
- Real-time ticket generation and tracking
- User dashboard for managing
