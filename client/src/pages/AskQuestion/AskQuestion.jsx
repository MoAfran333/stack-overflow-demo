import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { askQuestion } from "../../action/question.js";
import "./AskQuestion.css";

function AskQuestion() {
  const [questionTitle, setQuestionTitle] = useState("");
  const [questionBody, setQuestionBody] = useState("");
  const [questionTags, setQuestionTags] = useState("");
  const user = useSelector((state) => state.currentUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user) {
      if (questionTitle && questionBody && questionTags) {
        dispatch(
          askQuestion(
            {
              questionTitle,
              questionBody,
              questionTags,
              userPosted: user.result.name,
            },
            navigate
          )
        );
      } else {
        alert("Please Fill all the Fields");
      }
    } else {
      alert("Login to Ask a Question");
    }
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      // can also write e.code
      setQuestionBody(questionBody + "\n");
    }
  };

  return (
    <div className="ask-question">
      <div className="ask-ques-container">
        <h1>Ask a Public Question</h1>
        <form onSubmit={handleSubmit}>
          <div className="ask-form-container">
            <label htmlFor="ask-ques-title">
              <h4>Title</h4>
              <p>
                Be Specific and Imagine you're Asking a Question to Another
                Person
              </p>
              <input
                type="text"
                id="ask-ques-title"
                onChange={(e) => {
                  setQuestionTitle(e.target.value);
                }}
                placeholder="e.g. Is there an R Function for finding the index of an Element in a Vector?"
              />
            </label>
            <label htmlFor="ask-ques-body">
              <h4>Body</h4>
              <p>
                Include all the Information one would need to Answer your
                Question
              </p>
              <textarea
                name=""
                id="ask-ques-body"
                onChange={(e) => {
                  setQuestionBody(e.target.value);
                }}
                cols={30}
                rows={10}
                onKeyDown={handleEnter}
              ></textarea>
            </label>
            <label htmlFor="ask-ques-tags">
              <h4>Tags</h4>
              <p>Add up to 5 Tags to describe your topic of Question</p>
              <input
                type="text"
                id="ask-ques-tags"
                onChange={(e) => {
                  setQuestionTags(e.target.value.split(" "));
                }}
                placeholder="e.g. xml typescript wordpress"
              />
            </label>
          </div>
          <input
            type="submit"
            value="Review Your Question"
            className="review-btn"
          />
        </form>
      </div>
    </div>
  );
}

export default AskQuestion;
