import "./Modal.css";

function Modal({ movie, closeModal }) {
  const rottenTomatoesRating = movie.Ratings.find(
    (rating) => rating.Source === "Rotten Tomatoes"
  );

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
        </div>
      </div>
    </div>
  );
}

export default Modal;
