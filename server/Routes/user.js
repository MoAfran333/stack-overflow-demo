import express from "express";
import { signUp, logIn } from "../Controller/auth.js";
import { getAllUsers, updateProfile } from "../Controller/users.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/login", logIn);

router.get("/getallusers", getAllUsers);
router.patch("/update/:id", auth, updateProfile);

export default router;
