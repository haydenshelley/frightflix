import YouTube from "react-youtube";
import "./InfoModal.css";
import { useState, useEffect } from "react";
import movieTrailer from "movie-trailer";

function Modal({ movie, closeModal, movieId }) {
  const rottenTomatoesRating = movie.Ratings.find(
    (rating) => rating.Source === "Rotten Tomatoes"
  );
  const [trailerUrl, setTrailerUrl] = useState("");

  const opts = {
    playerVars: {
      autoplay: 0,
      referrerPolicy: "no-referrer",
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

  const handleInfoClick = (event) => {
    event.stopPropagation();
  };

  const handleGetMovieId = () => {
    console.log(movieId);
  };

  return (
    <div className="modalBackground" onClick={() => closeModal()}>
      <div className="modalContainer" onClick={handleInfoClick}>
        <div className="content">
          <h1>
            {movie.Title}({movie.Year})
          </h1>
          <p>{movie.Genre}</p>
          <p>{movie.Runtime}</p>
          {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
          <p>{movie.Plot}</p>
          <h2>Cast & Crew</h2>
          <p>Director: {movie.Director}</p>
          <p>Writer(s): {movie.Writer}</p>
          <p>Actors: {movie.Actors}</p>
          <h2>Ratings</h2>
          {rottenTomatoesRating && (
            <p>Rotten Tomatoes: {rottenTomatoesRating.Value}</p>
          )}
          <p>IMDb: {movie.imdbRating}</p>
          <button onClick={handleGetMovieId}>Add to my list</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
