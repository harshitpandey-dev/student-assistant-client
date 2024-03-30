import { useState } from "react";
import "./Authstyle.css";
import { notifications } from "@mantine/notifications";
import authService from "../../services/Auth.services";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });

  const handleLogin = (event) => {
    event.preventDefault();

    if (userDetails.email === "" || userDetails.password === "") {
      notifications.show({
        title: "Error",
        message: "Email and password is required",
        color: "red",
      });
    }

    authService
      .login(userDetails.email, userDetails.password)
      .then((response) => {
        if (response.statusCode === 200) {
          notifications.show({
            title: "Success",
            message: "user login succussfully",
            color: "green",
          });
          navigate("/home");
        } else if (response.statusCode === 401) {
          notifications.show({
            title: "Error",
            message: "password Invalid",
            color: "red",
          });
        } else if (response.statusCode === 404) {
          notifications.show({
            title: "Error",
            message: "Register yourself first",
            color: "red",
          });
          navigate("/signup");
        }
      });
  };
  return (
    <section className="d-flex justify-content-center flex-column align-items-center text-center ">
      <div className="p-5 d-flex justify-content-center w-100 algn-items-center text-center">
        <div className=" bg-image logo-login">
          <img src="/src/assets/studentass1.png"></img>
        </div>
      </div>

      <div className="card mx-4 mx-md-5 shadow-5-strong p-4" style={{ marginTop:" -100px"}}

        >
        <div className="card-body py-5 px-md-5">

          <div className="row d-flex justify-content-center">
            <div className="col-lg-8">
              <h2 className="fw-bold mb-5 text-light box-title" style={{ fontFamily:"'Gluten', sans-serif",fontSize:"50px"}}>Login</h2>
              <form>
                {/* <!-- 2 column grid layout with text inputs for the first and last names --> */}
                <div className="row">

                </div>

                {/* <!-- Email input --> */}
                <div className="form-outline mb-4">
                  <input type="email" id="form3Example3" className="form-control" 
                            placeholder="Enter Email"
                            value={userDetails.email}
                            onChange={(event) => {
                              setUserDetails({
                                ...userDetails,
                                email: event.currentTarget.value,
                              });
                            }}
                  />
                  <label className="form-label" for="form3Example3">Email address</label>
                </div>

                {/* <!-- Password input --> */}
                <div className="form-outline mb-4">
                  <input type="password" id="form3Example4" className="form-control" 
                            placeholder="Enter Password"
                            value={userDetails.password}
                            onChange={(event) => {
                              setUserDetails({
                                ...userDetails,
                                password: event.currentTarget.value,
                              });
                            }}
                  />
                  <label className="form-label" for="form3Example4">Password</label>
                </div>

                {/* <!-- Checkbox --> */}
                <div className="form-check d-flex justify-content-center mb-4">
                  
                          <a  href="/forgotpassword" className="btn btn-danger">
                           Forgot Password ?
                          </a>
                </div>
                <div className="form-check d-flex justify-content-center mb-4">
                {/* <!-- Submit button --> */}
                <button type="submit" className="btn btn-primary btn-block mb-4 "  
                          onClick={(event) => {
                            handleLogin(event);
                          }}
                >
                  Submit
                </button>
                <button className="btn btn-warning btn-block mb-4">
                  <a className="btn btn-warning" href="/signup">
                           Signup
                      </a>

                </button>
                </div>
               
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
