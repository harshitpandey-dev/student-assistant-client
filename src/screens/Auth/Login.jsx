import { useEffect, useState } from "react";
import "./Authstyle.css";
import { notifications } from "@mantine/notifications";
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

  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { userData, loading, error } = userLogin

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (userData) {
      navigate.push("/home")
    }
  }, [userData, redirect])

  const handleLogin = async (e) => {
    e.preventDefault()
    if (userDetails.email === "" || userDetails.password === "") {
      notifications.show({
        title: "Error",
        message: "Email and password is required",
        color: "red",
      });
      dispatch(login(userDetails.email, userDetails.password))
      alert("ads")
    }
  }

  return (

    <section class="auth" >
      <div class="container h-100">
        <div class="row d-flex align-items-center justify-content-center h-100">
          <div className="display-1" style={{ fontFamily: "'Gluten', sans-serif" }}>Student <span style={{ color: "#8991E4" }}>Assistant</span></div>

          <div class="col-md-8 col-lg-7 col-xl-6">
            <img src="/src/assets/studentass1.png"
              class="img-fluid" alt="Phone image" />
          </div>
          <div class="col-md-7 col-lg-5 col-xl-5 offset-xl-1 p-4 text-center" style={{ background: "#8991E4" }}>
            <h1 className="mb-1 text-light display-3" style={{ fontFamily: "'Gluten', sans-serif" }}>Login</h1>
            <form>

              <div class="form-outline mb-2" >
                <input type="email" id="form1Example13" class="form-control form-control-lg" placeholder="Enter Email"
                  value={userDetails.email}
                  onChange={(event) => {
                    setUserDetails({
                      ...userDetails,
                      email: event.currentTarget.value,
                    });
                  }} />

              </div>


              <div class="form-outline mb-2">
                <input type="password" id="form1Example23" class="form-control form-control-lg" placeholder="Enter Password"
                  value={userDetails.password}
                  onChange={(event) => {
                    setUserDetails({
                      ...userDetails,
                      password: event.currentTarget.value,
                    });
                  }} />

              </div>

              <div class="d-flex justify-content-around align-items-center mb-4">

                <a href="/forgotpassword" className="btn btn-danger">
                  Forgot Password ?
                </a>

              </div>
              <div className="form-check d-flex flex-row flex-wrap justify-content-center mb-4">

                <div type="submit" className="btn btn-success btn-block mb-4 w-50 h-100 p-3"
                  onClick={(event) => {
                    handleLogin(event);
                  }}
                >
                  Submit
                </div>

                <a className="btn btn-primary btn-block mb-4 w-45 h-100 p-3 text-light" href="/signup">
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
