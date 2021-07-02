import {
  SEND_EMAIL_FORGET_PASSWORD,
  SEND_EMAIL_FORGET_PASSWORD_SUCCESS,
  SEND_EMAIL_FORGET_PASSWORD_FAILED,
  SEND_OTP_AND_NEW_PASSWORD,
  SEND_OTP_AND_NEW_PASSWORD_SUCCESS,
  SEND_OTP_AND_NEW_PASSWORD_FAILED,
  RESET_FORGET_PASSWORD,
} from "../constants/auth";

const initialState = {
  step: 1,
  errorMessage: "",
  isLoading: false,
  email: "",
};

export default function forgetPasswordReducer(state = initialState, action) {
  switch (action.type) {
    case SEND_EMAIL_FORGET_PASSWORD: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case SEND_EMAIL_FORGET_PASSWORD_SUCCESS: {
      return {
        ...state,
        step: 2,
        isLoading: false,
        email: action.email,
      };
    }
    case SEND_EMAIL_FORGET_PASSWORD_FAILED: {
      return {
        ...state,
        isLoading: false,
        errorMessage: action.errorMessage,
      };
    }
    case SEND_OTP_AND_NEW_PASSWORD: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case SEND_OTP_AND_NEW_PASSWORD_SUCCESS: {
      return {
        ...state,
        step: 3,
        isLoading: false,
      };
    }
    case SEND_OTP_AND_NEW_PASSWORD_FAILED: {
      return {
        ...state,
        isLoading: false,
        errorMessage: action.errorMessage,
      };
    }

    case RESET_FORGET_PASSWORD: {
      return initialState;
    }
    default:
      return state;
  }
}
