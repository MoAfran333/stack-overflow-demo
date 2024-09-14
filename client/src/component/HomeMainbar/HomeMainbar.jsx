import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import QuestionList from "./QuestionList";
import { useSelector } from "react-redux";
import "./HomeMainbar.css";

function HomeMainbar() {
  const user = useSelector((state) => state.currentUser);
  const questionList = useSelector((state) => state.questions);
  console.log(questionList.data);
  const navigate = useNavigate();
  const location = useLocation();

  const checkAuth = () => {
    if (user === null) {
      alert("Login or SignUp to Ask a Question!");
      navigate("/auth");
    } else {
      navigate("/askquestion");
    }
  };

  return (
    <div className="main-bar">
      <div className="main-bar-header">
        {location.pathname === "/" ? (
          <h1>Top Questions</h1>
        ) : (
          <h1>All Questions</h1>
        )}
        <button className="ask-btn" onClick={checkAuth}>
          Ask Question
        </button>
      </div>
      <div>
        {questionList.data === null ? (
          <h1>Loading...</h1>
        ) : (
          <>
            <p>{questionList.data.length} Questions</p>
            <QuestionList questionList={questionList.data} />
          </>
        )}
      </div>
    </div>
  );
}

export default HomeMainbar;
