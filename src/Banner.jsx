import { useEffect, useState } from "react";
import axios from "./axios";
import requests from "./requests";
import "./Banner.css";

function Banner({ openModal }) {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchIndex);
      setMovie(
        request.data[Math.floor(Math.random() * request.data.length - 1)]
      );
      return request;
    }
    fetchData();
  }, []);

  const handleInfoClick = () => {
    openModal(movie.id);
  };

  return (
    <header
      className="banner"
      style={{
        backgroundImage: `url(${movie.horizontal_image})`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
      }}
    >
      <div className="banner_contents">
        <div className="banner_left">
          <h1 className="banner_title">{movie.title}</h1>
          <h1 className="banner_description">{movie?.description}</h1>
          <div className="banner_buttons">
            <button className="banner_button" onClick={handleInfoClick}>
              Info
            </button>
          </div>
        </div>
      </div>
      <div className="banner--fadeBottom" />
    </header>
  );
}

export default Banner;
