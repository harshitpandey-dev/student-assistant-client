import { useEffect, useState } from "react";
import "../../index.css";
import { useNavigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import Message from "../../components/common/Message";
import Loader from "../../components/common/Loader";
import { register } from "../../actions/userActions";
import { useDispatch, useSelector } from "react-redux";

function Signup() {
  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
    contact: "",
  });
  const redirect = location.search ? location.search.split("=")[1] : "/";
  const [message, setMessage] = useState(null);
  const [passwordWarning, setPasswordWarning] = useState(null);
  const [emailWarning, setEmailWarning] = useState(null);
  const dispatch = useDispatch();
  const userVerification = useSelector((state) => state.userVerification);
  const { verification, loading, error } = userVerification;
  const userRegister = useSelector((state) => state.userRegister);
  const {
    userData,
    loading: loadingRegister,
    error: errorRegister,
  } = userRegister;

  useEffect(() => {
    if (userData) {
      navigate("/login");
    }
  }, [userRegister, redirect]);

  const handleSignUp = (e) => {
    e.preventDefault();
    if (
      userDetails.password === "" ||
      userDetails.email === "" ||
      userDetails.contact === "" ||
      userDetails.fullname === "" ||
      userDetails.username === ""
    ) {
      setMessage("Invalid Input");
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    } else if (!userDetails.email.endsWith("@hbtu.ac.in")) {
      setEmailWarning("Only HBTU ID accepted");
      setTimeout(() => {
        setEmailWarning(null);
      }, 6000);
    }
    if (!validatePassword(userDetails.password)) {
      setPasswordWarning(
        "Password must contain at least one special character, one uppercase letter, one lowercase letter, and be at least 8 characters long."
      );
      setTimeout(() => {
        setPasswordWarning(null);
      }, 3000);
    } else {
      dispatch(
        register(
          userDetails.email,
          userDetails.password,
          userDetails.contact,
          userDetails.fullname,
          userDetails.username
        )
      );
    }
  };

  const validatePassword = (password) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setUserDetails({ ...userDetails, password });
  };

  const handleEmailChange = (e) => {
    const email = e.target.value;
    setUserDetails({ ...userDetails, email });
  };

  return (
    <section className="auth">
      <div className="container h-100">
        <div className="row d-flex align-items-center justify-content-center h-100">
          <div className="col-auto">
            <img
              src="/src/assets/IMG_3056.PNG"
              className="img-fluid"
              alt="Phone image"
              style={{ width: "100px", height: "auto" }}
            />
          </div>
          <div className="col-auto">
            <div
              className="display-1"
              style={{ fontFamily: "'Gluten', sans-serif" }}
            >
              Student <span style={{ color: "#8991E4" }}>Assistant</span>
            </div>
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
              className="mb-2 text-light display-3"
              style={{ fontFamily: "'Gluten', sans-serif" }}
            >
              Signup
            </h1>
            {loading && (
              <Spinner
                animation="border"
                role="status"
                variant="danger"
                style={{
                  width: "100px",
                  margin: "auto",
                  height: "100px",
                  display: "block",
                }}
              />
            )}
            {verification && (
              <Message variant="success">{verification.response}</Message>
            )}
            {error && <Message variant="danger">{error}</Message>}
            {message && <Message variant="danger">{message}</Message>}
            {errorRegister && (
              <Message variant="danger">{errorRegister}</Message>
            )}
            {loadingRegister && <Loader />}
            <form>
              <div className="form-outline mb-2">
                <input
                  type="text"
                  id="form3Example1"
                  className="form-control form-control"
                  placeholder="Enter fullName"
                  size="md"
                  value={userDetails.fullname}
                  onChange={(event) => {
                    setUserDetails({
                      ...userDetails,
                      fullname: event.currentTarget.value,
                    });
                  }}
                />
              </div>
              <div className="form-outline mb-2">
                <input
                  type="email"
                  id="form3Example3"
                  className="form-control"
                  placeholder="Enter Email"
                  size="md"
                  value={userDetails.email}
                  onChange={handleEmailChange}
                />
                {emailWarning && (
                  <div className="text-danger">{emailWarning}</div>
                )}
              </div>
              <div className="form-outline mb-2">
                <input
                  id="form3Example3"
                  className="form-control"
                  type="text"
                  placeholder="Enter Contact"
                  size="md"
                  value={userDetails.contact}
                  onChange={(event) => {
                    setUserDetails({
                      ...userDetails,
                      contact: event.currentTarget.value,
                    });
                  }}
                />
              </div>
              <div className="form-outline mb-2">
                <input
                  id="form3Example3"
                  className="form-control"
                  type="text"
                  placeholder="Enter userName"
                  size="md"
                  value={userDetails.username}
                  onChange={(event) => {
                    setUserDetails({
                      ...userDetails,
                      username: event.currentTarget.value,
                    });
                  }}
                />
              </div>

              <div className="form-outline mb-2">
                <input
                  type="password"
                  id="form3Example4"
                  className="form-control"
                  placeholder="Enter Password"
                  size="md"
                  value={userDetails.password}
                  onChange={handlePasswordChange}
                />
                {passwordWarning && (
                  <div className="text-danger">{passwordWarning}</div>
                )}
              </div>

              <div className="form-check d-flex flex-row flex-wrap justify-content-center mb-4">
                <div
                  type="submit"
                  className="btn btn-success btn-block mb-4 w-50 h-100 p-3"
                  onClick={(e) => handleSignUp(e)}
                >
                  Submit
                </div>
                <a
                  href="/login"
                  className="btn btn-primary btn-block mb-4 w-45 h-100 p-3 text-light "
                >
                  Login
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Signup;
