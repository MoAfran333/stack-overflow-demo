import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import AskQuestion from "./pages/AskQuestion/AskQuestion";
import Auth from "./pages/Auth/Auth";
import Question from "./pages/Question/Question";
import DisplayQuestion from "./pages/Question/DisplayQuestion";
import Tags from "./pages/Tags/Tags";
import Users from "./pages/Users/Users";
import UserProfile from "./pages/UserProfile/UserProfile";

function Allroutes({ slideIn, handleSlideIn }) {
  return (
    <Routes>
      <Route
        path="/"
        element={<Home slideIn={slideIn} handleSlideIn={handleSlideIn} />}
      />
      <Route path="/askquestion" element={<AskQuestion />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/questions" element={<Question slideIn={slideIn} />} />
      <Route
        path="/questions/:id"
        element={<DisplayQuestion slideIn={slideIn} />}
      />
      <Route path="/tags" element={<Tags slideIn={slideIn} />} />
      <Route path="/users" element={<Users slideIn={slideIn} />} />
      <Route path="/users/:id" element={<UserProfile slideIn={slideIn} />} />
    </Routes>
  );
}

export default Allroutes;
