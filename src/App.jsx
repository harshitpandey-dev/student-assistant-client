import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./screens/Auth/Login";
import Signup from "./screens/Auth/Signup";
import Home from "./screens/Home/Home";
import AddProduct from "./screens/Addproduct/Addproduct";
import ChangePassword from "./screens/Auth/Changepassword";
import ForgotPassword from "./screens/Auth/Forgotpassword";
import PasswordReset from "./screens/Auth/Resetpassword";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/addProduct" element={<AddProduct />} />
        <Route path="/changepassword" element={<ChangePassword />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/passwordReset" element={<PasswordReset />} />
      </Routes>
    </Router>
  );
}

export default App;
