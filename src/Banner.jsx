import { useEffect, useState } from "react";
import axios from "./axios";
import requests from "./requests";
import "./Banner.css";

function Banner() {
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

  return (
    <header
      className="banner"
      style={{
        backgroundImage: `url(${"https://png.pngtree.com/thumb_back/fh260/background/20230617/pngtree-halloween-wallpapers-and-backgrounds-for-laptop-or-desktop-image_2968567.jpg"})`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
      }}
    >
      <div className="banner_contents">
        <div className="banner_left">
          <h1 className="banner_title">{movie.title}</h1>
          <h1 className="banner_description">{movie?.description}</h1>
          <div className="banner_buttons">
            <button className="banner_button">Info</button>
            <button className="banner_button">My List</button>
          </div>
        </div>
        <div className="banner_right">
          <img id="banner-image" src={movie.image} alt={movie.title} />
        </div>
      </div>
      <div className="banner--fadeBottom" />
    </header>
  );
}

export default Banner;
