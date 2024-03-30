import { useState } from "react";
import STUDENT_ASSISTANT_IMG from "../../assets/studentass1.png";
import { notifications } from "@mantine/notifications";
import "./Authstyle.css";
import authService from "../../services/Auth.services";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    password: "",
    fullname: "",
  });

  const handleSignUp = (event) => {
    event.preventDefault();
    if (
      userDetails.username === "" ||
      userDetails.email === "" ||
      userDetails.password === "" ||
      userDetails.fullname === ""
    ) {
      notifications.show({
        title: "Error",
        message: "Please fill all the required details.",
        color: "red",
      });
      console.log("notifications");
      return;
    }

    authService
      .register(
        userDetails.username,
        userDetails.fullname,
        userDetails.email,
        userDetails.password
      )
      .then((response) => {
        console.log(response);
        if (response.statusCode === 200) {
          notifications.show({
            title: "success",
            message: "user registered successfully",
            color: "green",
          });
          navigate("/");
        } else if (response.statusCode === 400) {
          notifications.show({
            title: "Error",
            message: "Please provide all the required details.",
            color: "red",
          });
        } else if (response.statusCode === 409) {
          notifications.show({
            title: "success",
            message: "you are already registered",
            color: "yellow",
          });
        }
      });
  };

  return (


    <section class="vh-100">
      <div class="container py-5 h-100">
        <div class="row d-flex align-items-center justify-content-center h-100">
          <div className="display-1" style={{ fontFamily: "'Gluten', sans-serif" }}>Student <span style={{ color: "#8991E4" }}>Assistant</span></div>

          <div class="col-md-8 col-lg-7 col-xl-6">
            <img src="/src/assets/studentass1.png"
              class="img-fluid" alt="Phone image" />
          </div>
          <div class="col-md-7 col-lg-5 col-xl-5 offset-xl-1 p-4" style={{ background: "#8991E4" }}>
            <form>

              <div className="form-outline mb-4">
                <input type="text" id="form3Example1" className="form-control form-control-lg"

                  placeholder="Enter Name"
                  size="md"
                  value={userDetails.fullname}
                  onChange={(event) => {
                    setUserDetails({
                      ...userDetails,
                      fullname: event.currentTarget.value,
                    });
                  }}
                />
                <label className="form-label" for="form3Example1">Name</label>
              </div>
              <div className="form-outline mb-4">
                <input type="email" id="form3Example3" className="form-control"
                  placeholder="Enter Email"
                  size="md"
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
              <div className="form-outline mb-4">
                <input id="form3Example3" className="form-control"
                  type="text"
                  placeholder="Enter Username"
                  size="md"
                  value={userDetails.username}
                  onChange={(event) => {
                    setUserDetails({
                      ...userDetails,
                      username: event.currentTarget.value,
                    });
                  }}
                />
                <label className="form-label" for="form3Example3">Username</label>
              </div>


              <div className="form-outline mb-4">
                <input type="password" id="form3Example4" className="form-control"
                  placeholder="Enter Password"
                  size="md"
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

              <div className="form-check d-flex justify-content-center mb-4">

                <button type="submit" className="btn btn-primary btn-block mb-4"
                  onClick={(event) => {
                    handleSignUp(event);
                  }}
                >
                  Submit
                </button>

                <button className="btn btn-success">
                  <a href="/" className="btn btn-success">Login</a>
                </button>

              </div>
              




            </form>
          </div>
        </div>
      </div>
    </section>

  );
}

export default Signup;
