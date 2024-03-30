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
    <section className="d-flex justify-content-center flex-column align-items-center text-center ">
      <div className="p-5 d-flex justify-content-center w-100 algn-items-center text-center">
        <div className=" bg-image logo-login">
          <img src="/src/assets/studentass1.png"></img>
        </div>
      </div>

      <div className="card mx-4 mx-md-5 shadow-5-strong p-4" style={{ marginTop: " -100px" }}

      >
        <div className="card-body py-5 px-md-5">

          <div className="row d-flex justify-content-center">
            <div className="col-lg-8">
              <h2 className="fw-bold mb-5 text-light box-title" style={{ fontFamily: "'Gluten', sans-serif", fontSize: "50px" }}>SignUp</h2>
              <form>
                {/* <!-- 2 column grid layout with text inputs for the first and last names --> */}
                <div className="row">
                   <div className="col-md-6 mb-4">
                    <div className="form-outline">
                      <input type="text" id="form3Example1" className="form-control" 
                  
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
                  </div> 
                  {/* <div className="col-md-6 mb-4">
                    <div className="form-outline">
                      <input type="text" id="form3Example2" className="form-control" />
                      <label className="form-label" for="form3Example2">Last name</label>
                    </div>
                  </div> */}
                </div>

                {/* <!-- Email input --> */}
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

                {/* <!-- Password input --> */}
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

                {/* <!-- Checkbox --> */}
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

                {/* <!-- Submit button --> */}
               


              </form>
            </div>
          </div>
        </div>
      </div>
    </section>

  );
}

export default Signup;
