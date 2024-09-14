import React from "react";
import { NavLink } from "react-router-dom";
import Globe from "../../assets/Globe.svg";
import "./LeftSidebar.css";

function LeftSidebar({ slideIn }) {
  const slideInStyle = {
    transform: "translateX(0%)",
  };
  const slideOutStyle = {
    transform: "translateX(-100%)",
  };

  return (
    <div
      className="left-sidebar"
      style={slideIn ? slideInStyle : slideOutStyle}
    >
      <nav className="side-nav">
        <button className="left-nav-btn">
          <NavLink to="/" className="side-nav-links" activeClassName="active">
            <p>Home</p>
          </NavLink>
        </button>
        <div className="side-nav-div">
          <div>PUBLIC</div>
          <button className="left-nav-btn">
            <NavLink
              to="/questions"
              className="side-nav-links"
              activeClassName="active"
            >
              <img src={Globe} alt="Globe" />
              <p style={{ paddingLeft: "10px" }}>Questions</p>
            </NavLink>
          </button>
          <button className="left-nav-btn">
            <NavLink
              to="/tags"
              className="side-nav-links"
              activeClassName="active"
              style={{ paddingLeft: "40px" }}
            >
              <p>Tags</p>
            </NavLink>
          </button>
          <button className="left-nav-btn">
            <NavLink
              to="/users"
              className="side-nav-links"
              activeClassName="active"
              style={{ paddingLeft: "40px" }}
            >
              <p>Users</p>
            </NavLink>
          </button>
        </div>
      </nav>
    </div>
  );
}

export default LeftSidebar;
