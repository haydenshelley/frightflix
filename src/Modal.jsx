import YouTube from "react-youtube";
import "./Modal.css";
import { useState, useEffect } from "react";
import movieTrailer from "movie-trailer";

function Modal({ movie, closeModal }) {
  const rottenTomatoesRating = movie.Ratings.find(
    (rating) => rating.Source === "Rotten Tomatoes"
  );
  const [trailerUrl, setTrailerUrl] = useState("");

  const opts = {
    playerVars: {
      autoplay: 0,
    },
  };

  useEffect(() => {
    movieTrailer(movie.Title)
      .then((url) => {
        const urlParams = new URLSearchParams(new URL(url).search);
        setTrailerUrl(urlParams.get("v"));
      })
      .catch((error) => {
        console.error("Error fetching trailer:", error);
      });
  }, [movie.Title]);

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <button onClick={() => closeModal()}>X</button>
        <div className="content">
          <h1>{movie.Title}</h1>
          <p>Released: {movie.Year}</p>
          <p>Runtime: {movie.Runtime}</p>
          <p>Genre(s): {movie.Genre}</p>
          <p>Director: {movie.Director}</p>
          <p>Writer(s): {movie.Writer}</p>
          <p>Actors: {movie.Actors}</p>
          <p>Plot: {movie.Plot}</p>
          {rottenTomatoesRating && (
            <p>Rotten Tomatoes: {rottenTomatoesRating.Value}</p>
          )}
          <h3>Trailer</h3>
          {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
        </div>
      </div>
    </div>
  );
}

export default Modal;
