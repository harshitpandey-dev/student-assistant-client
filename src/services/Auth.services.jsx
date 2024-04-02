// // import apiUtil from "../utils/Apiutils";

// class AuthService {
//   route = "/users";

//   register = async (username, password, email, fullname) =>
//     apiUtil.post(this.route + "/register", {
//       username,
//       email,
//       password,
//       fullname,
//     });

//   login = async (email, password) =>
//     apiUtil.post(this.route + "/login", {
//       email,
//       password,
//     });

//   logout = async (refreshToken) =>
//     apiUtil.post(this.route + "/logout", {
//       refreshToken,
//     });

//   refreshToken = async (refreshToken) =>
//     apiUtil.post(this.route + "/refresh-token", {
//       refreshToken,
//     });

//   forgotPassword = async (email) =>
//     apiUtil.post(this.route + "/requestpasswordreset", {
//       email,
//     });

//   resetPassword = async (email, token, password) =>
//     apiUtil.post(this.route + "/passwordReset", {
//       email,
//       token,
//       password,
//     });
// }

// export default new AuthService();
