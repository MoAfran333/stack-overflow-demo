import React from "react";
import { useState } from "react";
import moment from "moment";
import copy from "copy-to-clipboard";
import upvote from "../../assets/sort-up.svg";
import downvote from "../../assets/sort-down.svg";
import Avatar from "../../component/avatar/Avatar";
import DisplayAnswer from "./DisplayAnswer";
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteQuestion,
  voteQuestion,
  postAnswer,
} from "../../action/question.js";
import "./Question.css";

function QuestionDetails() {
  const [answer, setAnswer] = useState("");
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const questionList = useSelector((state) => state.questions);
  const location = useLocation();
  const user = useSelector((state) => state.currentUser);
  const url = "https://localhost:3000"; // change this later

  const handlePostAns = (e, answerLength) => {
    e.preventDefault();
    if (user === null) {
      alert("Login or Signup to Answer the Question");
      navigate("/auth");
    } else {
      if (answer === "") {
        alert("Enter an Answer before Submitting");
      } else {
        dispatch(
          postAnswer({
            id,
            noOfAnswers: answerLength + 1,
            answerBody: answer,
            userAnswered: user.result.name,
          })
        );
        setAnswer("");
      }
    }
  };

  const handleShare = () => {
    copy(url + location.pathname);
    alert("Copied URL : " + url + location.pathname);
  };

  const handleDelete = () => {
    dispatch(deleteQuestion(id, navigate));
  };

  const handleUpvote = () => {
    if (user === null) {
      alert("Login or Signup to Answer the Question");
      navigate("/auth");
    } else {
      dispatch(voteQuestion(id, "upvote"));
    }
  };

  const handleDownvote = () => {
    if (user === null) {
      alert("Login or Signup to Answer the Question");
      navigate("/auth");
    } else {
      dispatch(voteQuestion(id, "downvote"));
    }
  };

  return (
    <div className="question-details-page">
      {questionList.data === null ? (
        <h1>Loading</h1>
      ) : (
        <>
          {questionList.data
            .filter((question) => question._id === id)
            .map((question) => (
              <div key={question}>
                <section className="question-details-container">
                  <h1>{question.questionTitle}</h1>
                  <div className="question-details-container-2">
                    <div className="question-votes">
                      <img
                        src={upvote}
                        alt="Upvote"
                        width={18}
                        className="votes-icon"
                        onClick={handleUpvote}
                      />
                      <p>{question.upvote.length - question.downvote.length}</p>
                      <img
                        src={downvote}
                        alt="downvote"
                        width={18}
                        className="votes-icon"
                        onClick={handleDownvote}
                      />
                    </div>
                    <div style={{ width: "100%" }}>
                      <p className="question-body">{question.questionBody}</p>
                      <div className="question-details-tags">
                        {question.questionTags.map((tag) => (
                          <p key={tag}>{tag}</p>
                        ))}
                      </div>
                      <div className="question-actions-user">
                        <div>
                          <button type="button" onClick={handleShare}>
                            Share
                          </button>
                          {user?.result?._id === question?.userID && (
                            <button type="button" onClick={handleDelete}>
                              Delete
                            </button>
                          )}
                        </div>
                        <div>
                          <p>Asked {moment(question.askedOn).fromNow()}</p>
                          <Link
                            to={`/users/${question.userID}`}
                            className="user-link"
                            style={{ color: "#0086d8" }}
                          >
                            <Avatar
                              backgroundColor="orange"
                              px="8px"
                              py=" 5px"
                              borderRadius="4px"
                            >
                              {question.userPosted.charAt(0).toUpperCase()}
                            </Avatar>
                            <div>{question.userPosted}</div>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
                {question.noOfAnswers !== 0 && (
                  <section>
                    <h3>{question.noOfAnswers} Answers</h3>
                    <DisplayAnswer
                      key={question._id}
                      question={question}
                      handleShare={handleShare}
                    />
                  </section>
                )}
                <section className="post-ans-container">
                  <h3>Your Answer</h3>
                  <form
                    onSubmit={(e) => handlePostAns(e, question.answer.length)}
                  >
                    <textarea
                      name=""
                      id=""
                      cols="30"
                      rows="10"
                      value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                    ></textarea>
                    <br />
                    <input
                      type="submit"
                      className="post-ans-btn"
                      value="Post Your Answer"
                    />
                  </form>
                  <p>
                    Browse Other questions Tagged
                    {question.questionTags.map((tag) => (
                      <Link to={`/tags`} key={tag} className="ans-tag">
                        {" "}
                        {tag}{" "}
                      </Link>
                    ))}{" "}
                    or
                    <Link
                      to="/askquestions"
                      style={{ textDecoration: "none", color: "#009dff" }}
                    >
                      {" "}
                      Ask Your Own Question
                    </Link>
                  </p>
                </section>
              </div>
            ))}
        </>
      )}
    </div>
  );
}

export default QuestionDetails;
