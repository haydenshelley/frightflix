import { useEffect, useState } from "react";
import "./Nav.css";

function Nav() {
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

  return (
    <div className={`nav ${show && "nav_black"}`}>
      <h1 className="logo">FrightFlix</h1>
      <img
        className="nav_avatar"
        src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/e70b1333850498.56ba69ac32ae3.png"
      />
    </div>
  );
}

export default Nav;
