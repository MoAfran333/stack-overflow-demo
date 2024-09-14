import express from "express";
import {
  getAllQuestions,
  askQuestion,
  deleteQuestion,
  voteQuestion,
} from "../Controller/question.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/ask", auth, askQuestion);
router.get("/get", getAllQuestions);

router.delete("/delete/:id", auth, deleteQuestion);
router.patch("/vote/:id", auth, voteQuestion);

export default router;
