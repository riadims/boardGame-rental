// App.jsx
// Main application component that sets up routing for the board game rental app.
// Uses React Router to define all available routes and their corresponding components.

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AddGame from "./pages/AddGame";
import Dashboard from './pages/Dashboard';
import EditGame from "./pages/EditGame";
import Settings from './pages/Settings.jsx';

/**
 * App component that defines the main routes for the application.
 * - '/' and '/login': Login page
 * - '/register': Registration page
 * - '/add-game': Add new board game
 * - '/dashboard': Main dashboard
 * - '/edit/:id': Edit board game by ID
 * - '/settings': User settings (change password)
 */
function App() {
  return (
    <Router>
      <Routes>
        {/* Show login form on root */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/add-game" element={<AddGame />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/edit/:id" element={<EditGame />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Router>
  );
}

export default App;
