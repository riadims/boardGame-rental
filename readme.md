# Board Game Rental — Full Stack Project

This repository contains a complete board game rental application, featuring a React + Vite frontend and a Node.js/Express + MongoDB backend. The project is designed to help users register, log in, manage their board games, borrow and return games, and update their account settings.

## Project Overview

- **Frontend**: Built with React and Vite, providing a modern, responsive user interface. Users can register, log in, browse available games, add/edit/delete their own games, borrow/return games, and manage their account settings.
- **Backend**: Built with Node.js, Express, and MongoDB (Mongoose). Handles user authentication (JWT), board game CRUD operations, borrowing/returning logic, and user profile management. Passwords are securely hashed, and all sensitive routes are protected.

## Repository Structure

```
boardGame-rental/
├── boardgame-frontend/   # React + Vite frontend application
│   └── README.md         # Frontend setup & usage instructions
├── server/               # Node.js/Express backend API
│   └── README.md         # Backend setup & usage instructions
├── readme.md             # (This file) Project overview & architecture
└── ...                   # Other project files
```

## Key Features
- User registration and login with JWT authentication
- Secure password storage and change functionality
- Add, edit, delete, and list board games
- Borrow and return games, with status tracking
- User dashboard and settings
- RESTful API with clear separation of concerns
- MongoDB Atlas or local MongoDB support
- Modern, component-based frontend with CSS modules

## Installation & Setup
- **Frontend and backend have separate installation and setup instructions.**
- Please refer to the `README.md` files in the `boardgame-frontend/` and `server/` folders for detailed guides on installing dependencies, configuring environment variables, and running each part of the project.

## Technologies Used
- **Frontend**: React, Vite, React Router, CSS Modules, Axios
- **Backend**: Node.js, Express, Mongoose, MongoDB, JWT, bcrypt, dotenv, CORS

## Environment & Configuration
- The backend requires a `.env` file for MongoDB and JWT configuration (see backend README).
- The frontend expects the backend API to be running and accessible (see frontend README).

## Contribution & Customization
- The project is modular and can be extended with new features (e.g., game images, reviews, admin roles).
- Feel free to fork, modify, and use for learning or as a starter for your own projects.

## License
This project is provided as-is for educational and demonstration purposes.

---
For installation, setup, and API usage, please see the `README.md` files in each respective folder.
