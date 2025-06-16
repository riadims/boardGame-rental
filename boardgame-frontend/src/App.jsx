import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Games from "./pages/Games";
import AddGame from "./pages/AddGame";
import Dashboard from './pages/Dashboard';
import EditGame from "./pages/EditGame";
import Settings from './pages/Settings.jsx';

function App() {
  return (
    <Router>
      <Routes>
        {/* Show login form on root */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/games" element={<Games />} />
        <Route path="/add-game" element={<AddGame />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/edit/:id" element={<EditGame />} />
         <Route path="/settings" element={<Settings />} />
      </Routes>
    </Router>
  );
}

export default App;
