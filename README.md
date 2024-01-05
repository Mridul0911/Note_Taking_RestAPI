# Note Taking API

This repository contains a RESTful API for managing notes. Users can perform CRUD operations on notes, share them, and search for notes based on keywords.

## Technology Stack

- **Framework:** [Express.js](https://expressjs.com/) (Node.js web application framework)
- **Database:** [MongoDB](https://www.mongodb.com/) (NoSQL database)
- **Authentication:** JSON Web Tokens (JWT)
- **Middleware:** [express-rate-limit](https://www.npmjs.com/package/express-rate-limit) (for rate limiting and request throttling)

## Project Structure

- **API:** Contains route handlers for user and note-related actions.
- **Controller:** Implements business logic and interacts with the service layer.
- **DBConnection:** Manages the connection to the MongoDB database.
- **Middleware:** Provides middleware functions, e.g., for JWT authentication and rate limiting.
- **Model:** Defines MongoDB schemas for User and Note.
- **Service:** Handles core business logic, such as user registration, note creation, etc.

## Setup Instructions

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/note-taking-api.git
   cd note-taking-api

1. **Install dependencies:**
    ```bash
   npm install

1. **Configure Environment Variables:**
    ```bash
   API_PORT=8080
    MONGO_URI=your_mongo_db_connection_string
    TOKEN_KEY=your_secret_jwt_key

1. **Run the Application:**
    ```bash
   npm start


## Rate Limiting
- The API is protected by rate limiting and request throttling using the express-rate-limit middleware. Adjust the configuration in app.js if needed.

## Notes
- Ensure MongoDB is running and accessible before starting the API.
- Use Postman or similar tools to test the API endpoints.
