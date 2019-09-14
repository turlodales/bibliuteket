import firebase from "@firebase/app"; //eslint-disable-line
import "@firebase/auth"; //eslint-disable-line
import Toast from "react-native-root-toast";
import {
  FETCH_USER,
  USER_UPDATE,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  REGISTER_USER_REQUEST,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL
} from "./types";

export const userUpdate = ({ prop, value }) => {
  return {
    type: USER_UPDATE,
    payload: { prop, value }
  };
};

export const loginUser = ({ liuid, password }) => {
  return dispatch => {
    dispatch({ type: LOGIN_USER_REQUEST });
    const email = `${liuid}@student.liu.se`;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => loginUserSuccess(dispatch))
      .catch(error => loginUserFail(error.message, dispatch));
  };
};

export const registerUser = ({ name, liuid, password }) => {
  return dispatch => {
    dispatch({ type: REGISTER_USER_REQUEST });
    const email = `${liuid}@student.liu.se`;
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(userInfo => {
        userInfo.user
          .updateProfile({
            displayName: name
          })
          .then(() => {
            userInfo.user
              .sendEmailVerification()
              .then(() => console.log("Sent email confirmation"))
              .catch(error => console.log(error));
          })
          .then(() => {
            registerUserSuccess(dispatch);
          });
      })
      .catch(error => registerUserFail(error.message, dispatch));
  };
};
export const deleteUser = () => {
  return dispatch => {
    dispatch({ type: DELETE_USER_REQUEST });
    firebase
      .auth()
      .currentUser.delete()
      .then(() => Toast.show("Ditt konto har tagits bort"))
      .then(() => {
        deleteUserSuccess(dispatch);
      })
      .catch(error => deleteUserFail(error.message, dispatch));
  };
};

const loginUserFail = (error, dispatch) => {
  dispatch({
    type: LOGIN_USER_FAIL,
    payload: error
  });
};

const loginUserSuccess = dispatch => {
  dispatch({
    type: LOGIN_USER_SUCCESS
  });
};

const registerUserFail = (error, dispatch) => {
  dispatch({
    type: REGISTER_USER_FAIL,
    payload: error
  });
};

const registerUserSuccess = dispatch => {
  dispatch({
    type: REGISTER_USER_SUCCESS
  });
};

const deleteUserFail = (error, dispatch) => {
  dispatch({
    type: DELETE_USER_FAIL,
    payload: error
  });
};

const deleteUserSuccess = dispatch => {
  dispatch({
    type: DELETE_USER_SUCCESS
  });
};
