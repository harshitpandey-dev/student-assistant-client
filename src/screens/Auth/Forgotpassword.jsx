import { useEffect, useState } from "react";
import "../../index.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { sendEmail } from "../../actions/userActions";

function ForgotPassword() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  useEffect(() => {
    if (localStorage.getItem("userData")) {
      setEmail(JSON.parse(localStorage.getItem("userData")).email);
    } else {
      setEmail("");
    }
  }, []);
  const handleResetPassword = async () => {
    dispatch(sendEmail(email));
  };

  return (
    <div className="w-100 d-flex flex-column align-items-center forgotpsswrd fs-1">
      <p className="forgottext">Forgot Password?</p>
      <input
        type="text"
        placeholder="Enter Email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <button className="resetbtn" onClick={handleResetPassword}>
        Reset Password
      </button>
      <button className="B2loginbtn" onClick={() => navigate("/")}>
        Back to Home
      </button>
    </div>
  );
}

export default ForgotPassword;
