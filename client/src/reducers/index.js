import authReducer from "./auth";
import { combineReducers } from "redux";
import currentUserReducer from "./currentUser";
import userReducer from "./users";
import questionReducer from "./question";

const reducers = combineReducers({
  auth: authReducer,
  currentUser: currentUserReducer,
  users: userReducer,
  questions: questionReducer,
});

export default reducers;
