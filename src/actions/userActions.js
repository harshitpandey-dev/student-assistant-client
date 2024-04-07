import axios from "axios";
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_RESET,
  // EMAIL_SEND_FAIL,
  // EMAIL_SEND_SUCCESS,
  // EMAIL_SEND_REQUEST,
  USER_LIST_FAIL,
  USER_LIST_SUCCESS,
  USER_LIST_REQUEST,
  USER_LIST_RESET,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_DELETE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_RESET,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  // USER_VERIFICATION_LINK_REQUEST,
  // USER_VERIFICATION_LINK_SUCCESS,
  // USER_VERIFICATION_LINK_FAIL,
  // USER_VERIFICATION_LINK_RESET,
} from "../types/userConstants";

export const login = (email, password) => async (dispatch) => {
  try {
    // console.log(email);

    if (localStorage.getItem("userData")) {
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: JSON.parse(localStorage.getItem("userData")),
      });
      return;
    }
    dispatch({
      type: USER_LOGIN_REQUEST,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      },
    };
    const { data } = await axios.post(
      "/api/users/login",
      { email, password },
      config
    );
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data.data.user,
    });

    localStorage.setItem("userData", JSON.stringify(data.data.user));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//for logout

export const logout = () => async (dispatch, getState) => {
  const {
    userLogin: { userData },
  } = getState();
  console.log(userData);
  const config = {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      Authorization: `Bearer ${userData.token}`,
    },
  };
  await axios.post("/api/users/logout", {}, config);
  localStorage.removeItem("userData");
  dispatch({
    type: USER_LOGOUT,
  });
  dispatch({
    type: USER_REGISTER_RESET,
  });
  dispatch({
    type: USER_LIST_RESET,
  });
  dispatch({
    type: USER_UPDATE_RESET,
  });
  // dispatch({
  //   type: USER_VERIFICATION_LINK_RESET,
  // });
};

//register users
// export const verify = (name, email, password, phone_no, address) => async (
//   dispatch
// ) => {
//   try {
//     dispatch({
//       type: USER_VERIFICATION_LINK_REQUEST,
//     })
//     const config = {
//       headers: {
//         'Content-Type': 'application/json',
//         "Access-Control-Allow-Origin": "*",
//         "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"

//       },
//     }

//     // console.log(phone_no)

//     const { data } = await axios.post(
//       '/api/users/verificationlink',
//       { name, email, password, contact: { phone_no }, address },
//       config
//     )
//     dispatch({
//       type: USER_VERIFICATION_LINK_SUCCESS,
//       payload: data,
//     })
//   } catch (error) {
//     dispatch({
//       type: USER_VERIFICATION_LINK_FAIL,
//       payload:
//         error.response && error.response.data.message
//           ? error.response.data.message
//           : error.message,
//     })
//   }
// }
//user register

export const register =
  (email, password, contact, fullname, username) => async (dispatch) => {
    try {
      dispatch({
        type: USER_REGISTER_REQUEST,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        },
      };

      const { data } = await axios.post(
        "/api/users",
        { fullname, username, email, password, contact },
        config
      );

      dispatch({
        type: USER_REGISTER_SUCCESS,
        payload: data.data,
      });
    } catch (error) {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

//EMAIL SEND

export const sendEmail =
  (receiver, text, name, address, productName, email, phone_no) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: EMAIL_SEND_REQUEST,
      });
      const {
        userLogin: { userData },
      } = getState();
      const config = {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          Authorization: `Bearer ${userData.token}`,
        },
      };

      const { data } = await axios.post(
        "/api/users/email",
        { receiver, text, name, address, productName, email, phone_no },
        config
      );
      console.log(data);
      dispatch({
        type: EMAIL_SEND_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: EMAIL_SEND_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

//get all users by an  admin
export const listUsers = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_LIST_REQUEST,
    });
    const {
      userLogin: { userData },
    } = getState();
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        Authorization: `Bearer ${userData.token}`,
      },
    };

    const { data } = await axios.get("/api/users", {}, config);
    dispatch({
      type: USER_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//delete user by an admin

export const deleteUser = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DELETE_REQUEST,
    });
    const {
      userLogin: { userData },
    } = getState();
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        Authorization: `Bearer ${userData.token}`,
      },
    };

    await axios.delete(`/api/users/${id}`, {}, config);
    dispatch({
      type: USER_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: USER_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//user update

export const updateUser = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_REQUEST,
    });
    const {
      userLogin: { userData },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",

        Authorization: `Bearer ${userData.token}`,
      },
    };
    console.log(config);
    // console.log(id)
    const { data } = await axios.put(`/api/users/${user._id}`, user, config);
    dispatch({
      type: USER_UPDATE_SUCCESS,
      payload: data.data.updatedUser,
    });

    localStorage.setItem("userData", JSON.stringify(data.data.updatedUser));
    
  } catch (error) {
    dispatch({
      type: USER_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//get user details

export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DETAILS_REQUEST,
    });
    if (localStorage.getItem("userData")) {
      dispatch({
        type: USER_DETAILS_SUCCESS,
        payload: JSON.parse(localStorage.getItem("userData")),
      });
      return;
    }
    const {
      userLogin: { userData },
    } = getState();

    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        Authorization: `Bearer ${userData.token}`,
      },
    };

    const { data } = await axios.get(`/api/users/${id}`, {}, config);

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    });
    // console.log(data);
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: USER_DETAILS_FAIL,
      payload: message,
    });
  }
};


export const updateUserPassword = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_REQUEST,
    });
    const {
      userLogin: { userData },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",

        Authorization: `Bearer ${userData.token}`,
      },
    };
    // console.log(config);
    // console.log(id)
    const { data } = await axios.post(`/api/users/changepassword`, user, config);
    dispatch({
      type: USER_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};