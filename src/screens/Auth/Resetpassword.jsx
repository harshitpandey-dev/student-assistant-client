// import { useState } from "react";
// import { useLocation } from "react-router-dom";
// import authService from "../../services/Auth.services";

// function PasswordReset() {
//   const location = useLocation();
//   const searchParams = new URLSearchParams(location.search);
//   const token = searchParams.get("token");
//   const email = searchParams.get("email");

//   const [password, setPassword] = useState("");

//   const handleResetPassword = async () => {
//     try {
//       await authService.resetPassword(email, token, password);
//     } catch (error) {
//       console.error("Password reset failed:", error);
//     }
//   };

//   return (
//     <div>
//       <h2>Password Reset</h2>
//       <input
//         type="password"
//         placeholder="Enter New Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       <button onClick={handleResetPassword}>Reset Password</button>
//     </div>
//   );
// }

// export default PasswordReset;
