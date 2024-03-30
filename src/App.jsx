import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./screens/Auth/Login";
import Signup from "./screens/Auth/Signup";
import Header from './components/Header'
import AddProduct from "./screens/Addproduct/Addproduct";
import ChangePassword from "./screens/Auth/Changepassword";
import ForgotPassword from "./screens/Auth/Forgotpassword";
import PasswordReset from "./screens/Auth/Resetpassword";
import './index.css'
import AboutUsScreen from "./screens/AboutUsScreen";
import ProductScreen from "./screens/ProductScreen";
// import UserListScreen from "./screens/UserListScreen";
import NotFoundScreen from "./screens/NotFoundScreen";
// import ProductListScreen from "./screens/ProductListScreen";
// import ProductCreateScreen from "./screens/ProductCreateScreen";
// import ProductEditScreen from "./screens/ProductEditScreen";
// import UserUpdateScreen from "./screens/UserUpdateScreen";
// import EmailVerificationScreen from "./screens/EmailVerificationScreen";



function App() {
  return (
    <Router>
    <>
    <Header />
     <main className="pt-3">
      <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            {/* <Route path="/home" element={<Home />} /> */}
            <Route path="/addProduct" element={<AddProduct />} />
            <Route path="/changepassword" element={<ChangePassword />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/passwordReset" element={<PasswordReset />} />

            {/* --------- */}
            <Route path='/about' element={<AboutUsScreen />} exact />
            <Route path='/product/:id' element={<ProductScreen />} exact />
            {/* <Route
              path='/admin/userlist'
              element={<UserListScreen />}
              exact
            /> */}  
            {/* <Route
              path='/admin/productlist'
              element={<ProductListScreen />}
              exact
            /> */}
            {/* <Route
              path='/admin/productlist/:pageNumber'
              element={<ProductListScreen />}
              exact
            /> */}
            {/* <Route path='/createproduct' element={<ProductCreateScreen />} /> */}
            {/* <Route
              path='/admin/product/:id/edit'
              element={<ProductEditScreen />}
              exact
            /> */}
            {/* <Route
              path='/admin/users/:id/edit'
              element={<UserUpdateScreen />}
              exact
            /> */}
            {/* <Route
              path='/verify/:token'
              element={<EmailVerificationScreen />}
              exact
            /> */}
        <Route path="*" element={<NotFoundScreen />} />
      </Routes>
        </main>
      </>
    </Router>
  );
}

export default App;



