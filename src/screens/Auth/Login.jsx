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

    <section class="auth" >
      <div class="container py-5 h-100">
        <div class="row d-flex align-items-center justify-content-center h-100">
          <div className="display-1" style={{ fontFamily:"'Gluten', sans-serif"}}>Student <span style={{ color:"#8991E4"}}>Assistant</span></div>

          <div class="col-md-8 col-lg-7 col-xl-6">
            <img src="/src/assets/studentass1.png"
              class="img-fluid" alt="Phone image" />
          </div>
          <div class="col-md-7 col-lg-5 col-xl-5 offset-xl-1 p-4 text-center" style={{ background: "#8991E4" } }>
            <h1 className="mb-5 text-light display-3" style={{ fontFamily: "'Gluten', sans-serif"}}>Login</h1>
            <form>
   
              <div class="form-outline mb-4" >
                <input type="email" id="form1Example13" class="form-control form-control-lg" />
                <label class="form-label" for="form1Example13" 
                  placeholder="Enter Email"
                  value={userDetails.email}
                  onChange={(event) => {
                    setUserDetails({
                      ...userDetails,
                      email: event.currentTarget.value,
                    });
                  }}>Email address</label>
              </div>

 
              <div class="form-outline mb-4">
                <input type="password" id="form1Example23" class="form-control form-control-lg" />
                <label class="form-label" for="form1Example23"
                  placeholder="Enter Password"
                  value={userDetails.password}
                  onChange={(event) => {
                    setUserDetails({
                      ...userDetails,
                      password: event.currentTarget.value,
                    });
                  }}
                >Password</label>
              </div>

              <div class="d-flex justify-content-around align-items-center mb-4">
     
                <a href="/forgotpassword" className="btn btn-danger">
                                       Forgot Password ?
                                       </a>
           
              </div>
                        <div className="form-check d-flex flex-column justify-content-center mb-4">

                <div type="submit" className="btn btn-success btn-block mb-4 w-100 h-100 p-3"
                         onClick={(event) => {
                           handleLogin(event);
                         }}
               >
                 Submit
               </div>
               
                <a className="btn btn-primary btn-block mb-4 w-100 h-100 p-3" href="/signup">
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
