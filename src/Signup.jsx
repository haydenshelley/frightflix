import axios from "./axios";
import { useState } from "react";
import "./Signup.css";

function Signup({ closeSignupModal, fetchSignup }) {
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
      .post(fetchSignup, params)
      .then((response) => {
        console.log(response.data);
        event.target.reset();
        window.location.href = "/";
      })
      .catch((error) => {
        console.log(error.response.data.errors);
        setErrors(error.response.data.errors);
      });
  };

  const handleFormClick = (event) => {
    event.stopPropagation();
  };

  return (
    <div className="signupModalBackground" onClick={closeSignupModal}>
      <div className="signupModalContainer">
        <div className="signupContent" onClick={handleFormClick}>
          <h1>Signup</h1>
          <ul>
            {errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>
                Name:
                <input name="name" type="text" />
              </label>
            </div>
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
            <div className="form-group">
              <label>
                Password confirmation:
                <input name="password_confirmation" type="password" />
              </label>
            </div>
            <button type="submit">Signup</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
