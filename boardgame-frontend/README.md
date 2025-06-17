# Board Game Rental Frontend

This is the frontend application for the Board Game Rental system, built with React and Vite. It provides a user-friendly interface for users to register, log in, manage their board games, borrow and return games, and update their account settings.

## Features

- **User Authentication**: Register and log in securely. JWT tokens are stored in localStorage and attached to API requests automatically.
- **Dashboard**: View all available board games, borrow or return games, and manage your own games (edit/delete).
- **Game Management**: Add new games, edit existing ones, and delete games you own.
- **Password Management**: Change your account password from the settings page.
- **Responsive UI**: Clean and modern interface styled with CSS modules.

## Project Structure

```
boardgame-frontend/
├── public/                # Static assets
├── src/
│   ├── api/
│   │   └── api.js         # Axios instance for API requests
│   ├── assets/            # Images and static assets
│   ├── pages/             # Main page components
│   │   ├── AddGame.jsx
│   │   ├── Dashboard.jsx
│   │   ├── EditGame.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Settings.jsx
│   │   └── styles/        # CSS modules for each page
│   ├── App.jsx            # Main app and routing
│   ├── main.jsx           # React entry point
│   └── index.css          # Global styles
├── package.json           # Project dependencies and scripts
├── vite.config.js         # Vite configuration
└── README.md              # Project documentation
```

## Getting Started

### Prerequisites
- Node.js (v18 or newer recommended)
- npm or yarn

### Installation
1. Clone the repository and navigate to the `boardgame-frontend` folder:
   ```sh
   git clone <repo-url>
   cd boardgame-frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   # or
   yarn install
   ```

### Running the Development Server
Start the frontend with Vite:
```sh
npm run dev
# or
yarn dev
```
The app will be available at [http://localhost:5173](http://localhost:5173) by default.

### Building for Production
To build the app for production:
```sh
npm run build
# or
yarn build
```
The output will be in the `dist/` folder.

## API Integration
- All API requests are made to `http://localhost:5000/api` by default (see `src/api/api.js`).
- JWT tokens are automatically attached to requests if present in localStorage.
- Ensure the backend server is running and accessible at the specified base URL.

## Main Components
- **App.jsx**: Sets up routing for all pages.
- **Login/Register**: User authentication pages.
- **Dashboard**: Main page for browsing and managing games.
- **AddGame/EditGame**: Forms for adding and editing games.
- **Settings**: Change user password.

## Styling
- CSS Modules are used for component-scoped styles (see `src/pages/styles/`).

## Customization
- Update the API base URL in `src/api/api.js` if your backend runs on a different address.
- Modify or extend page components in `src/pages/` as needed for your use case.

## License
This project is provided as-is for educational and demonstration purposes.