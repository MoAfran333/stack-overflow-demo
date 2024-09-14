import "./App.css";
import Navbar from "./component/navbar/Navbar";
import { fetchAllUsers } from "./action/users";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Allroutes from "./Allroutes";
import { getAllQuestions } from "./action/question";

function App() {
  const [slideIn, setSlideIn] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllUsers());
    dispatch(getAllQuestions());
  }, [dispatch]);

  useEffect(() => {
    if (window.innerWidth <= 768) {
      setSlideIn(false);
    }
  }, []);

  const handleSlideIn = () => {
    if (window.innerWidth <= 768) {
      setSlideIn((state) => !state);
    }
  };

  return (
    <div className="App">
      <Router>
        <Navbar handleSlideIn={handleSlideIn} />
        <Allroutes slideIn={slideIn} handleSlideIn={handleSlideIn} />
      </Router>
    </div>
  );
}

export default App;
