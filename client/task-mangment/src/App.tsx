import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import CreateUser from "./pages/CreateUser";
import WelcomePage from "./pages/WelcomePage";
import TaskDashboard from "./pages/TaskDashboard";
import Registre from "./pages/Register";
const App = () => {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<TaskDashboard></TaskDashboard>}></Route> */}
        {/* <Route path="/" element={<WelcomePage />}></Route> */}
        <Route path="/" element={<Registre />}></Route>

        <Route path="login" element={<Login />}></Route>
        <Route path="create-user" element={<CreateUser />}></Route>
      </Routes>
    </Router>
  );
};

export default App;
