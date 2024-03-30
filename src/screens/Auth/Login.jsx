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

    <section class="vh-100">
      <div class="container py-5 h-100">
        <div class="row d-flex align-items-center justify-content-center h-100">
          <div className="display-1" style={{ fontFamily:"'Gluten', sans-serif"}}>Student <span style={{ color:"#8991E4"}}>Assistant</span></div>

          <div class="col-md-8 col-lg-7 col-xl-6">
            <img src="/src/assets/studentass1.png"
              class="img-fluid" alt="Phone image" />
          </div>
          <div class="col-md-7 col-lg-5 col-xl-5 offset-xl-1 p-4" style={{ background: "#8991E4" } }>
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
                        <div className="form-check d-flex justify-content-center mb-4">

               <button type="submit" className="btn btn-primary btn-block mb-4 "  
                         onClick={(event) => {
                           handleLogin(event);
                         }}
               >
                 Submit
               </button>
                <button className="btn btn-warning btn-block" >
                 <a className="btn btn-warning" href="/signup">
                          Signup
                     </a>

               </button>
               </div>


      

            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
