import { useEffect, useState } from "react";

import "../../index.css";
import Message from "../../components/common/Message";
import Loader from "../../components/common/Loader";
// import authService from "../../services/Auth.services";
import { useNavigate } from "react-router-dom";
import { login } from "../../actions/userActions";
import { useDispatch, useSelector } from "react-redux";

function Login() {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });
  const [vaild, setValid] = useState(null);
  const dispatch = useDispatch();
  var userLogin = useSelector((state) => state.userLogin);
  const { userData, loading, error } = userLogin;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userData) {
      navigate("/");
    }
  }, [userData, redirect, error, userLogin]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setValid(true);
    if (userDetails.email === "" || userDetails.password === "") {
      setValid(false);
      return;
    }
    dispatch(login(userDetails.email, userDetails.password));
  };

  return (
    <section className="auth">
      <div className="container h-100">
        <div className="row d-flex align-items-center justify-content-center h-100">
          <div
            className="display-1"
            style={{ fontFamily: "'Gluten', sans-serif" }}
          >
            Student <span style={{ color: "#8991E4" }}>Assistant</span>
          </div>

          <div className="col-md-8 col-lg-7 col-xl-6">
            <img
              src="/src/assets/studentass1.png"
              className="img-fluid"
              alt="Phone image"
            />
          </div>
          <div
            className="col-md-7 col-lg-5 col-xl-5 offset-xl-1 p-4 text-center"
            style={{ background: "#8991E4" }}
          >
            <h1
              className="mb-1 text-light display-3"
              style={{ fontFamily: "'Gluten', sans-serif" }}
            >
              Login
            </h1>
            {error && <Message variant="danger">{error}</Message>}
            {vaild === false && (
              <Message variant="danger">Invalid Input</Message>
            )}
            {loading && <Loader />}
            <form>
              <div className="form-outline mb-2">
                <input
                  type="email"
                  id="form1Example13"
                  className="form-control form-control-lg"
                  placeholder="Enter Email"
                  value={userDetails.email}
                  onChange={(event) => {
                    setUserDetails({
                      ...userDetails,
                      email: event.currentTarget.value,
                    });
                  }}
                />
              </div>

              <div className="form-outline mb-2">
                <input
                  type="password"
                  id="form1Example23"
                  className="form-control form-control-lg"
                  placeholder="Enter Password"
                  value={userDetails.password}
                  onChange={(event) => {
                    setUserDetails({
                      ...userDetails,
                      password: event.currentTarget.value,
                    });
                  }}
                />
              </div>

              <div className="d-flex justify-content-around align-items-center mb-4">
                <a href="/forgotpassword" className="btn btn-danger">
                  Forgot Password ?
                </a>
              </div>
              <div className="form-check d-flex flex-row flex-wrap justify-content-center mb-4">
                <div
                  type="submit"
                  className="btn btn-success btn mb-4 w-50 h-100 p-3"
                  onClick={(e) => handleLogin(e)}
                >
                  Submit
                </div>

                <a
                  className="btn btn-primary btn-block mb-4 w-45 h-100 p-3 text-light"
                  href="/signup"
                >
                  Signup
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
