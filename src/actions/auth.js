import {
  DO_SIGNUP,
  DO_SIGNUP_SUCCESS,
  DO_SIGNUP_FAIL,
  DO_SIGNIN,
  DO_SIGNIN_SUCCESS,
  DO_SIGNIN_FAIL,
  RESET_STATUS,
  VERIFY_ACCESSTOKEN_SUCCESS,
  VERIFY_ACCESSTOKEN_FAIL,
  SEND_EMAIL_FORGET_PASSWORD,
  SEND_EMAIL_FORGET_PASSWORD_SUCCESS,
  SEND_EMAIL_FORGET_PASSWORD_FAILED,
  SEND_OTP_AND_NEW_PASSWORD,
  SEND_OTP_AND_NEW_PASSWORD_SUCCESS,
  SEND_OTP_AND_NEW_PASSWORD_FAILED,
} from "../constants/auth";
import { URL_SERVER } from "../configs/server";
import {
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
  EMAIL_KEY,
} from "../configs/client";
import jwt from "jwt-decode";
import Swal from "sweetalert2";
const firebase = require("firebase");

//#region  auth
const doSignUp = (infoUser) => {
  return (dispatch) => {
    dispatch({
      type: DO_SIGNUP,
    });

    fetch(`${URL_SERVER}/register`, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify(infoUser),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status === 200) {
          dispatch({
            type: DO_SIGNUP_SUCCESS,
          });
        } else {
          dispatch({
            type: DO_SIGNUP_FAIL,
            messageError: res.messageError,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

const doSignIn = (infoUser) => {
  return (dispatch) => {
    dispatch({
      type: DO_SIGNIN,
    });

    console.log("infoUser:", infoUser);

    fetch(`${URL_SERVER}/api/auth/login`, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify(infoUser),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.returnCode === 1) {
          localStorage.setItem(ACCESS_TOKEN_KEY, res.data.accessToken);
          localStorage.setItem(REFRESH_TOKEN_KEY, res.data.refreshToken);

          dispatch({
            type: DO_SIGNIN_SUCCESS,
            signinSuccess: true,
          });
        } else {
          dispatch({
            type: DO_SIGNIN_SUCCESS,
            signinSuccess: true,
          });
        }
      })
      .catch((error) => {
        console.log(error);
        dispatch({
          type: DO_SIGNIN_SUCCESS,
          signinSuccess: true,
        });
      });
  };
};

const verifyAccessToken = (accessToken) => {
  return (dispatch) => {
    fetch(`${URL_SERVER}/user/me`, {
      headers: new Headers({
        "Content-Type": "application/json",
        x_accesstoken: accessToken,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem(EMAIL_KEY, res.data.email);
          localStorage.setItem("role", res.data.role);

          dispatch({
            type: VERIFY_ACCESSTOKEN_SUCCESS,
            email: res.data.email,
            role: res.data.role,
          });
        } else {
          dispatch({
            type: VERIFY_ACCESSTOKEN_FAIL,
            messageError: res.messageError,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

const resetStatus = () => {
  return (dispatch) => {
    dispatch({
      type: RESET_STATUS,
    });
  };
};

//#endregion auth

//#region forget password
const doSendOTP = (email) => {
  return (dispatch) => {
    dispatch({
      type: SEND_EMAIL_FORGET_PASSWORD,
    });

    fetch(`${URL_SERVER}/api/users/getOTP`, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify(email),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.returnCode === 1)
          dispatch({
            type: SEND_EMAIL_FORGET_PASSWORD_SUCCESS,
            email: email,
          });
        else
          dispatch({
            type: SEND_EMAIL_FORGET_PASSWORD_FAILED,
            errorMessage: res.message,
          });
      })
      .catch((error) => {
        console.log(error);
        dispatch({
          type: SEND_EMAIL_FORGET_PASSWORD_FAILED,
          errorMessage: error.messageError,
        });
      });
  };
};

const doSendNewPassword = (otp, time, NewPassword, email) => {
  return (dispatch) => {
    dispatch({
      type: SEND_OTP_AND_NEW_PASSWORD,
    });
    let data = { otp, time, NewPassword, email };
    fetch(`${URL_SERVER}/api/users/sendOTPAndNewPassword`, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.returnCode === 1) {
          dispatch({
            type: SEND_OTP_AND_NEW_PASSWORD_SUCCESS,
          });
          Swal.fire(
            "Change password successfully",
            res.message,
            "success"
          ).then((result) => {
            if (result.value) {
              window.location.href = "/";
            }
          });
        } else {
          dispatch({
            type: SEND_OTP_AND_NEW_PASSWORD_FAILED,
            errorMessage: res.message,
          });
          Swal.fire("Change password failed", res.message, "error");
        }
      })
      .catch((error) => {
        console.log(error);
        dispatch({
          type: SEND_OTP_AND_NEW_PASSWORD_FAILED,
          errorMessage: error.messageError,
        });
      });
  };
};
//#endregion forger password
export {
  doSignUp,
  doSignIn,
  verifyAccessToken,
  resetStatus,
  doSendOTP,
  doSendNewPassword,
};
