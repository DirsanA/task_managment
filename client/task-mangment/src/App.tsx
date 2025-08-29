import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import CreateUser from "./pages/CreateUser";
import TaskDashboard from "./pages/TaskDashboard";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TaskDashboard></TaskDashboard>}></Route>
        <Route path="login" element={<Login />}></Route>
        <Route path="create-user" element={<CreateUser />}></Route>
      </Routes>
    </Router>
  );
};

export default App;
