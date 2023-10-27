import { useEffect, useState } from "react";
import axios from "./axios";
import "./Nav.css";

function Nav({ openLoginModal, openSignupModal, jwt }) {
  const [show, handleShow] = useState(false);

  const scrollListener = () => {
    if (window.scrollY > 100) {
      handleShow(true);
    } else {
      handleShow(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollListener);
    return () => {
      window.removeEventListener("scroll", scrollListener);
    };
  }, []);

  const handleLogout = (e) => {
    e.preventDefault();
    delete axios.defaults.headers.common["Authorization"];
    localStorage.removeItem("jwt");
    window.location.href = "/";
  };

  return (
    <div className={`nav ${show && "nav_black"}`}>
      <h1 className="logo">FrightFlix</h1>
      {jwt ? (
        <button className="session" onClick={handleLogout}>
          Logout
        </button>
      ) : (
        <div className="session-buttons">
          <button onClick={openLoginModal} className="session">
            Log In
          </button>
          <button onClick={openSignupModal} className="session signup">
            Sign Up
          </button>
        </div>
      )}
    </div>
  );
}

export default Nav;
