import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/",
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("Profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("Profile")).token
    }`;
  }
  return req;
});

export const signUp = (authData) => API.post("/user/signup", authData);
export const logIn = (authData) => API.post("/user/login", authData);

export const getAllUsers = () => API.get("/user/getallusers");
export const updateProfile = (id, updateData) =>
  API.patch(`/user/update/${id}`, updateData);

export const askQuestion = (questionData) =>
  API.post("/questions/ask", questionData);
export const getAllQuestions = () => API.get("/questions/get");

export const deleteQuestion = (id) => API.delete(`/questions/delete/${id}`);
export const voteQuestion = (id, value) =>
  API.patch(`/questions/vote/${id}`, { value });

export const postAnswer = (id, noOfAnswers, answerBody, userAnswered) =>
  API.patch(`/answer/post/${id}`, { noOfAnswers, answerBody, userAnswered });
export const deleteAnswer = (id, answerID, noOfAnswers) =>
  API.patch(`/answer/delete/${id}`, { answerID, noOfAnswers });
