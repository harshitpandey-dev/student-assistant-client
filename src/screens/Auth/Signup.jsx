import { useEffect, useState } from "react";
import "./Authstyle.css";
import { useNavigate } from "react-router-dom";
import { Spinner } from 'react-bootstrap'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import { verify } from '../../actions/userActions'
import { useDispatch, useSelector } from "react-redux";

function Signup() {
  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword:"",
    contact: "",
    address:""
  });
  const redirect = location.search ? location.search.split('=')[1] : '/'
  const [message, setMessage] = useState(null)
  const dispatch = useDispatch()
  const userVerification = useSelector((state) => state.userVerification)
  const { verification, loading, error } = userVerification
  const userRegister = useSelector((state) => state.userRegister)
  const {
    userData,
    loading: loadingRegister,
    error: errorRegister,
  } = userRegister


  useEffect(() => {
    if (userData) {
      navigate.push("/home")
    }
  }, [userData, redirect])

  const handleSignUp = (e) => {
    e.preventDefault()
    if (userDetails.password !== userDetails.confirmPassword) {
      setMessage('Passwords do not match')
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    } else {
      console.log("reg");
      dispatch(verify(userDetails.name, userDetails.email, userDetails.password, userDetails.contact, userDetails.address))
    }
  }

  return (


    <section class="auth">
      <div class="container h-100">
        <div class="row d-flex align-items-center justify-content-center h-100">
          <div className="display-1" style={{ fontFamily: "'Gluten', sans-serif" }}>Student <span style={{ color: "#8991E4" }}>Assistant</span></div>

          <div class="col-md-8 col-lg-7 col-xl-6">
            <img src="/src/assets/studentass1.png"
              class="img-fluid" alt="Phone image" />
          </div>
          <div class="col-md-7 col-lg-5 col-xl-5 offset-xl-1 p-4 text-center" style={{ background: "#8991E4" }}>
            <h1 className="mb-2 text-light display-3" style={{ fontFamily: "'Gluten', sans-serif" }}>Signup</h1>
            {loading && (
              <Spinner
                animation='border'
                role='status'
                variant='danger'
                style={{
                  width: '100px',
                  margin: 'auto',
                  height: '100px',
                  display: 'block',
                }}
              />
            )}
            {verification && (
              <Message variant='success'>{verification.response}</Message>
            )}
            {error && <Message variant='danger'>{error}</Message>}
            {message && <Message variant='danger'>{message}</Message>}
            {errorRegister && <Message variant='danger'>{errorRegister}</Message>}
            {loadingRegister && <Loader />}
            <form>

              <div className="form-outline mb-2">
                <input type="text" id="form3Example1" className="form-control form-control"

                  placeholder="Enter Name"
                  size="md"
                  value={userDetails.name}
                  onChange={(event) => {
                    setUserDetails({
                      ...userDetails,
                      name: event.currentTarget.value,
                    });
                  }}
                />
                
              </div>
              <div className="form-outline mb-2">
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
              </div>
              <div className="form-outline mb-2">
                <input id="form3Example3" className="form-control"
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
                <input id="form3Example3" className="form-control"
                  type="text"
                  placeholder="Enter Address"
                  size="md"
                  value={userDetails.address}
                  onChange={(event) => {
                    setUserDetails({
                      ...userDetails,
                      address: event.currentTarget.value,
                    });
                  }}
                />
              </div>


              <div className="form-outline mb-2">
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
              </div>
              <div className="form-outline mb-2">
                <input type="password" id="form3Example4" className="form-control"
                  placeholder="Confirm Password"
                  size="md"
                  value={userDetails.confirmPassword}
                  onChange={(event) => {
                    setUserDetails({
                      ...userDetails,
                      confirmPassword: event.currentTarget.value,
                    });
                  }}
                />
              </div>

              <div className="form-check d-flex flex-row flex-wrap justify-content-center mb-4">

                <div type="submit" className="btn btn-success btn-block mb-4 w-50 h-100 p-3"
                  onClick={(e)=>handleSignUp(e)}
                >
                  Submit
                </div>

                <a href="/" className="btn btn-primary btn-block mb-4 w-45 h-100 p-3 text-light ">
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
