import * as api from "../api";
import { setCurrentUser } from "./currentUser";
import { fetchAllUsers } from "./users";

export const signUp = (authData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signUp(authData);
    console.log("sign up data : ", data);
    dispatch({ type: "AUTH", data });
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))));
    dispatch(fetchAllUsers());
    navigate("/");
  } catch (error) {
    console.log("Error : ", error.message);
  }
};

export const logIn = (authData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.logIn(authData);
    console.log("Log in data : ", data);
    dispatch({ type: "AUTH", data });
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))));
    navigate("/");
  } catch (error) {
    console.log(error);
  }
};
