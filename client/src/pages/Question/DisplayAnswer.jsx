import React from "react";
import moment from "moment";
import { Link, useParams } from "react-router-dom";
import Avatar from "../../component/avatar/Avatar";
import { useDispatch, useSelector } from "react-redux";
import { deleteAnswer } from "../../action/question";

function DisplayAnswer({ question, handleShare }) {
  const user = useSelector((state) => state.currentUser);
  const { id } = useParams();
  const dispatch = useDispatch();

  const handleDelete = (answerID, noOfAnswers) => {
    dispatch(deleteAnswer(id, answerID, noOfAnswers - 1));
  };

  return (
    <div>
      {question.answer.map((ans) => (
        <div className="display-ans" id={ans._id}>
          <p>{ans.answerBody}</p>
          <div className="question-actions-user">
            <div>
              <button type="button" onClick={handleShare}>
                Share
              </button>
              {user?.result?._id === ans?.userID && (
                <button
                  type="button"
                  onClick={() => handleDelete(ans._id, question.noOfAnswers)}
                >
                  Delete
                </button>
              )}
            </div>
            <div>
              <p>Answered {moment(ans.answeredOn).fromNow()}</p>
              <Link
                to={`/users/${ans.userID}`}
                className="user-link"
                style={{ color: "#0086d8" }}
              >
                <Avatar
                  backgroundColor="lightgreen"
                  px="2px"
                  py=" 2px"
                  borderRadius="2px"
                >
                  {ans.userAnswered.charAt(0).toUpperCase()}
                </Avatar>
                <div>{ans.userAnswered}</div>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default DisplayAnswer;
