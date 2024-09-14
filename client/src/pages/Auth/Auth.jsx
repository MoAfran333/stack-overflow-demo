import React from "react";
import { useState } from "react";
import icon from "../../assets/icon.png";
import AboutAuth from "./AboutAuth";
import { dispatch, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signUp, logIn } from "../../action/auth";
import "./Auth.css";

function Auth() {
  const [isSigningUp, setIsSignedUp] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email && !password) {
      alert("Enter Email and Password");
    }
    if (isSigningUp) {
      if (!name) {
        alert("Enter your Name to Continue");
      }
      console.log(name, email, password);
      dispatch(signUp({ name, email, password }, navigate));
    } else {
      dispatch(logIn({ email, password }, navigate));
      console.log(email, password);
    }
  };

  const handleSwitch = () => {
    setIsSignedUp(!isSigningUp);
    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <section className="auth-section">
      {isSigningUp && <AboutAuth />}
      <div className="auth-container-2">
        <img src={icon} alt="Icon" className="login-logo" />
        <form onSubmit={handleSubmit}>
          {isSigningUp && (
            <label htmlFor="name">
              <h4>Display Name</h4>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
          )}
          <label htmlFor="email">
            <h4>Email</h4>
            <input
              type="text"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label htmlFor="password">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h4>Password</h4>
              {!isSigningUp && (
                <p style={{ color: "#007ac6", fontSize: "13px" }}>
                  Forgot Password?
                </p>
              )}
            </div>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button type="submit" className="auth-btn">
            {isSigningUp ? "Sign Up" : "Log In"}
          </button>
        </form>
        <p>
          {isSigningUp ? "Already have an Account" : "Don't have an Account"}
          <button
            type="button"
            className="handle-switch-btn"
            onClick={handleSwitch}
          >
            {isSigningUp ? "Log In" : "Sign Up"}
          </button>
        </p>
      </div>
    </section>
  );
}

export default Auth;
