# Board Game Rental Backend

This is the backend server for the Board Game Rental application. It is built with Node.js, Express, and MongoDB (using Mongoose). The backend provides RESTful API endpoints for user authentication, board game management, and user profile operations.

## Features
- User registration, login, and JWT-based authentication
- Board game CRUD operations (add, edit, delete, list)
- Borrowing and returning games
- User profile management and password change
- MongoDB database integration (Atlas or local)
- Secure password hashing with bcrypt

## Project Structure
```
server/
├── middleware/           # Express middleware (e.g., auth)
├── models/               # Mongoose models (User, BoardGame)
├── routes/               # Express route handlers
├── server.js             # Main server entry point
├── package.json          # Project dependencies and scripts
└── ...                   # Other config files
```

## Prerequisites
- Node.js (v18 or newer recommended)
- npm (comes with Node.js)
- MongoDB Atlas account (or a local MongoDB instance)

## Setup Instructions

### 1. Clone the Repository
```sh
git clone <repo-url>
cd boardGame-rental/server
```

### 2. Install Dependencies
```sh
npm install
```

### 3. Create a MongoDB Database
- Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and create a free account if you don't have one.
- Create a new cluster and database.
- Add a database user and password.
- Whitelist your IP address or allow access from anywhere (for development).
- Copy your connection string (e.g., `mongodb+srv://<user>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority`).

### 4. Configure Environment Variables
Create a `.env` file in the `server/` directory with the following content:
```
MONGO_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-random-jwt-secret>
PORT=5000
```
- Replace `<your-mongodb-connection-string>` with your Atlas URI.
- Set `<your-random-jwt-secret>` to a long, random string.
- You can change the `PORT` if needed.

### 5. Start the Server
```sh
npm start
npm run dev
```
- The server will run on `http://localhost:5000` by default.
- Ensure your frontend is configured to use this backend API.

## API Endpoints

### Authentication
- `POST /api/auth/register` — Register a new user
- `POST /api/auth/login` — Login and receive JWT token
- `GET /api/auth/me` — Get current user info (requires token)

### User
- `GET /api/users/me` — Get current user profile
- `PUT /api/users/me` — Update user profile
- `DELETE /api/users/me` — Delete user account
- `PUT /api/users/change-password` — Change password
- `GET /api/users/usernames` — List all usernames

### Board Games
- `GET /api/games/` — List all games
- `GET /api/games/:id` — Get game by ID
- `POST /api/games/` — Add a new game (requires token)
- `PUT /api/games/:id` — Update a game (requires token)
- `DELETE /api/games/:id` — Delete a game (requires token)
- `PUT /api/games/rent/:id` — Borrow a game (requires token)
- `PUT /api/games/return/:id` — Return a borrowed game (requires token)
- `GET /api/games/my-games` — List games owned by current user (requires token)
- `GET /api/games/borrowed` — List games borrowed by current user (requires token)

## Notes
- All protected routes require the `Authorization: Bearer <token>` header.
- Passwords are securely hashed using bcrypt before storage.
- JWT tokens are used for authentication and should be kept secret.

## Development Tips
- Use [Postman](https://www.postman.com/) or [Insomnia](https://insomnia.rest/) to test API endpoints.
- If using a local MongoDB instance, update `MONGO_URI` accordingly.
- For production, use strong secrets and restrict CORS origins.

## License
This project is provided as-is for educational and demonstration purposes.
