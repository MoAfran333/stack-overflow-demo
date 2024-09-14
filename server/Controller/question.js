import Question from "../models/question.js";
import mongoose from "mongoose";

export const askQuestion = async (req, res) => {
  const postQuestionData = req.body;
  const userID = req.userID;
  const postQuestion = new Question({ ...postQuestionData, userID });
  try {
    await postQuestion.save();
    res.status(200).json("Posted a Question Successfully");
  } catch (error) {
    console.log(error);
    return res.status(404).json("Couldn't Post a New Question");
  }
};

export const getAllQuestions = async (req, res) => {
  try {
    const questionList = await Question.find().sort({ askedOn: -1 });
    res.status(200).json(questionList);
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: error.message });
  }
};

export const deleteQuestion = async (req, res) => {
  const { id: _id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(400).send("Question Unavailable...");
  }
  try {
    await Question.findByIdAndDelete(_id);
    res.status(200).json({ message: "User Deleted Successfully" });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: error.message });
  }
};

export const voteQuestion = async (req, res) => {
  const { id: _id } = req.params;
  const { value } = req.body;
  const userID = req.userID;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(400).send("Question Unavailable...");
  }
  try {
    const question = await Question.findById(_id);
    const upIndex = question.upvote.findIndex((id) => id === String(userID));
    const downIndex = question.downvote.findIndex(
      (id) => id === String(userID)
    );

    if (value === "upvote") {
      if (downIndex !== -1) {
        question.downvote = question.downvote.filter(
          (id) => id !== String(userID)
        );
      }
      if (upIndex === -1) {
        question.upvote.push(userID);
      } else {
        question.upvote = question.upvote.filter((id) => id !== String(userID));
      }
    } else if (value === "downvote") {
      if (upIndex !== -1) {
        question.upvote = question.upvote.filter((id) => id !== String(userID));
      }
      if (downIndex === -1) {
        question.downvote.push(userID);
      } else {
        question.downvote = question.downvote.filter(
          (id) => id !== String(userID)
        );
      }
    }

    await Question.findByIdAndUpdate(_id, question);
    res.status(200).json({ message: "Voted Successfully..." });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: "ID not Found" });
  }
};
