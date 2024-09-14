import mongoose from "mongoose";
import Question from "../models/question.js";

export const postAnswer = async (req, res) => {
  const { id: _id } = req.params;
  const { noOfAnswers, answerBody, userAnswered } = req.body;
  const userID = req.userID;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(400).send("User Unavailable");
  }
  updateNoOfQuestions(_id, noOfAnswers);
  try {
    const updateQuestion = await Question.findByIdAndUpdate(_id, {
      $addToSet: { answer: [{ answerBody, userAnswered, userID }] },
    });
    res.status(200).json(updateQuestion);
  } catch (error) {
    return res.status(404).json({ message: "Error Uploading the Answer" });
  }
};

const updateNoOfQuestions = async (_id, noOfAnswers) => {
  try {
    await Question.findByIdAndUpdate(_id, {
      $set: {
        noOfAnswers: noOfAnswers,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteAnswer = async (req, res) => {
  const { id: _id } = req.params;
  const { answerID, noOfAnswers } = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(400).send("User Unavailable");
  }
  if (!mongoose.Types.ObjectId.isValid(answerID)) {
    return res.status(400).send("Answer Unavailable");
  }
  updateNoOfQuestions(_id, noOfAnswers);
  try {
    await Question.updateOne({ _id }, { $pull: { answer: { _id: answerID } } });
    res.status(200).json({ message: "Answer Deleted Successfully" });
  } catch (error) {
    return res.status(404).json({ message: "Error Deleting the Answer" });
  }
};
