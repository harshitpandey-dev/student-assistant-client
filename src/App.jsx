import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./screens/Auth/Login";
import Signup from "./screens/Auth/Signup";
// import ChangePassword from "./screens/Auth/Changepassword";
import ForgotPassword from "./screens/Auth/Forgotpassword";
import PasswordReset from "./screens/Auth/Resetpassword";
import "./index.css";
import AboutUsScreen from "./screens/About/AboutUsScreen";
import ProductScreen from "./screens/Product/ProductScreen";
import UserListScreen from "./screens/Admin/UserListScreen";
import NotFoundScreen from "./screens/About/NotFoundScreen";
import Landing from "./screens/Product/Landing";
import ProductListScreen from "./screens/Admin/ProductListScreen";
import ProductCreateScreen from "./screens/Product/ProductCreateScreen";
import Footer from "./components/Footer";
import ProductEditScreen from "./screens/Product/ProductEditScreen";
import UserProfileScreen from "./screens/Auth/UserProfileScreen";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login } from "./actions/userActions";
// import Chat from "./screens/Chat";
import ChatScreen from "./screens/Chat/ChatScreen";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem("userData")) {
      dispatch(login("", ""));
    }
  }, []);

  return (
    <Router>
      <>
        <Routes>
          <Route path="/login" element={<Login />} exact />
          <Route path="/signup" element={<Signup />} exact />
          <Route path="/" element={<Landing />} exact />
          <Route path="/search/:keyword" element={<Landing />} exact />
          <Route path="/page/:pageNumber" element={<Landing />} exact />
          <Route
            path="'/search/:keyword/page/:pageNumber'"
            element={<Landing />}
            exact
          />
          {/* <Route path="/changepassword" element={<ChangePassword />} exact />*/}
          <Route path="/passwordReset" element={<PasswordReset />} exact />
          <Route path="/forgotpassword" element={<ForgotPassword />} exact />

          {/* --------- */}
          <Route path="/about" element={<AboutUsScreen />} exact />
          <Route path="/product/:id" element={<ProductScreen />} exact />
          <Route path="/createproduct" element={<ProductCreateScreen />} />
          <Route path="/admin/userlist" element={<UserListScreen />} exact />
          <Route
            path="/admin/productlist"
            element={<ProductListScreen />}
            exact
          />
          <Route
            path="/admin/productlist/:pageNumber"
            element={<ProductListScreen />}
            exact
          />
          <Route
            path="/admin/product/:id/edit"
            element={<ProductEditScreen />}
            exact
          />
          <Route path="/users/:id" element={<UserProfileScreen />} exact />

          <Route path="/chatScreen/" element={<ChatScreen />} />
          <Route path="/chatScreen/:sellerID" element={<ChatScreen />} />
          <Route path="/chatScreen/chatID/:chatID" element={<ChatScreen />} />
          <Route path="*" element={<NotFoundScreen />} />
        </Routes>
        {/* <Footer /> */}
      </>
    </Router>
  );
}

export default App;
