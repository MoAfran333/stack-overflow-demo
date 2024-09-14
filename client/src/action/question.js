import * as api from "../api";

export const askQuestion = (questionData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.askQuestion(questionData);
    dispatch({ type: "POST_QUESTION", payload: data });
    dispatch(getAllQuestions());
    navigate("/");
  } catch (error) {
    console.log("Error : ", error.message);
  }
};

export const getAllQuestions = () => async (dispatch) => {
  try {
    const { data } = await api.getAllQuestions();
    dispatch({ type: "FETCH_ALL_QUESTIONS", payload: data });
  } catch (error) {
    console.log("Error : ", error.message);
  }
};

export const deleteQuestion = (id, navigate) => async (dispatch) => {
  try {
    await api.deleteQuestion(id);
    dispatch(getAllQuestions());
    navigate("/");
  } catch (error) {
    console.log("Error : ", error.message);
  }
};

export const voteQuestion = (id, value) => async (dispatch) => {
  try {
    await api.voteQuestion(id, value);
    dispatch(getAllQuestions());
  } catch (error) {
    console.log("Error : ", error.message);
  }
};

export const postAnswer = (answerData) => async (dispatch) => {
  try {
    const { id, noOfAnswers, answerBody, userAnswered } = answerData;
    const { data } = await api.postAnswer(
      id,
      noOfAnswers,
      answerBody,
      userAnswered
    );
    dispatch({ type: "POST_ANSWER", payload: data });
    dispatch(getAllQuestions());
  } catch (error) {
    console.log("Error : ", error.message);
  }
};

export const deleteAnswer = (id, answerID, noOfAnswers) => async (dispatch) => {
  try {
    await api.deleteAnswer(id, answerID, noOfAnswers);
    dispatch(getAllQuestions());
  } catch (error) {
    console.log("Error : ", error.message);
  }
};
