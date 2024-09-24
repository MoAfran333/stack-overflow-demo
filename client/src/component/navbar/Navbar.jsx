import React, { useCallback } from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import bars from "../../assets/bars-solid.svg";
import logo from "../../assets/logo.png";
import search from "../../assets/search-solid.svg";
import Avatar from "../avatar/Avatar";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "../../action/currentUser";
import { jwtDecode } from "jwt-decode";
import "./Navbar.css";

function Navbar({ handleSlideIn }) {
  let user = useSelector((state) => state.currentUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogOut = useCallback(() => {
    dispatch({ type: "LOGOUT" });
    dispatch(setCurrentUser(null));
    navigate("/");
  }, [dispatch, navigate]);

  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        handleLogOut();
      }
    }
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))));
  }, [user?.token, dispatch, handleLogOut]);

  return (
    <nav className="main-nav">
      <div className="navbar">
        <button className="slide-in-icon" onClick={handleSlideIn}>
          <img src={bars} alt="Bars" width={15} />
        </button>
        <div className="navbar-1">
          <Link to="/" className="nav-item nav-logo">
            <img src={logo} alt="Logo" />
          </Link>
          <Link to="/" className="nav-item nav-btn res-nav">
            About
          </Link>
          <Link to="/" className="nav-item nav-btn res-nav">
            Products
          </Link>
          <Link to="/" className="nav-item nav-btn res-nav">
            For Teams
          </Link>
          <form>
            <input type="text" placeholder="Search..." />
            <img src={search} alt="Search" width={18} className="search-icon" />
          </form>
        </div>
        <div className="navbar-2">
          {user === null ? (
            <Link to="/auth" className="nav-item nav-links">
              Log in
            </Link>
          ) : (
            <>
              <Avatar
                backgroundColor="#009dff"
                px="10px"
                py="7px"
                borderRadius="50%"
                color="white"
              >
                <Link
                  to={`/users/${user?.result?._id}`}
                  style={{
                    color: "white",
                    textAlign: "center",
                    textDecoration: "none",
                  }}
                >
                  {user?.result?.name.charAt(0).toUpperCase()}
                </Link>
              </Avatar>
              <button className="nav-item nav-links" onClick={handleLogOut}>
                Log out
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
