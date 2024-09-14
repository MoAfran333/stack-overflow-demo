import mongoose from "mongoose";

const questionSchema = mongoose.Schema({
  questionTitle: { type: String, required: "Question must have a Title" },
  questionBody: { type: String, required: "Question must have a Body" },
  questionTags: { type: [String], required: "Question must have Related Tags" },
  noOfAnswers: { type: Number, default: 0 },
  upvote: { type: [String], default: [] },
  downvote: { type: [String], default: [] },
  userPosted: { type: String, required: "Question mush have an Author" },
  userID: { type: String },
  askedOn: { type: Date, default: Date.now },
  answer: [
    {
      answerBody: String,
      userAnswered: String,
      userID: String,
      answeredOn: { type: Date, default: Date.now },
    },
  ],
});

export default mongoose.model("Question", questionSchema);
