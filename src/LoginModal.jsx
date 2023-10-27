import axios from "./axios";
import { useState } from "react";
import "./LoginModal.css";

function LoginModal({ closeLoginModal, fetchLogin }) {
  const jwt = localStorage.getItem("jwt");
  if (jwt) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
  }

  const [errors, setErrors] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors([]);
    const params = new FormData(event.target);
    axios
      .post(fetchLogin, params)
      .then((response) => {
        console.log(response.data);
        axios.defaults.headers.common["Authorization"] =
          "Bearer " + response.data.jwt;
        localStorage.setItem("jwt", response.data.jwt);
        event.target.reset();
        window.location.href = "/";
      })
      .catch((error) => {
        console.log(error.response);
        setErrors(["Invalid email or password"]);
      });
  };

  const handleFormClick = (event) => {
    event.stopPropagation();
  };

  return (
    <div className="loginModalBackground" onClick={closeLoginModal}>
      <div className="loginModalContainer">
        <div className="loginContent" onClick={handleFormClick}>
          <h1>Login</h1>
          <ul>
            {errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>
                Email:
                <input name="email" type="email" />
              </label>
            </div>
            <div className="form-group">
              <label>
                Password:
                <input name="password" type="password" />
              </label>
            </div>
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginModal;
