// import { useState } from "react";
// import "./Authstyle.css";
// import { useNavigate } from "react-router-dom";
// import authService from "../../services/Auth.services";

// function ForgotPassword() {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");

//   const handleResetPassword = async () => {
//     try {
//       await authService.forgotPassword(email);
//       navigate("/");
//     } catch (error) {
//       console.error("Password reset failed:", error);
//     }
//   };

//   return (
//     <div className="forgotpsswrd">
//       <p className="forgottext">Forgot Password?</p>
//       <input
//         type="text"
//         placeholder="Enter Email"
//         value={email}
//         onChange={(event) => setEmail(event.target.value)}
//       />
//       <button className="resetbtn" onClick={handleResetPassword}>
//         Reset Password
//       </button>
//       <button className="B2loginbtn" onClick={() => navigate("/")}>
//         Back to Login
//       </button>
//     </div>
//   );
// }

// export default ForgotPassword;
