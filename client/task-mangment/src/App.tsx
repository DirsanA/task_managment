import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import CreateUser from "./pages/CreateUser";
import WelcomePage from "./pages/WelcomePage";
import TaskDashboard from "./pages/TaskDashboard";
import Register from "./pages/Register";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/task-bar" element={<TaskDashboard />} />
        <Route path="/" element={<WelcomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-user" element={<CreateUser />} />
      </Routes>
    </Router>
  );
};

export default App;
