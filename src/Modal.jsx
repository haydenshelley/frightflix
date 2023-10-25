import "./Modal.css";

function Modal({ movie, closeModal }) {
  const rottenTomatoesRating = movie.Ratings.find(
    (rating) => rating.Source === "Rotten Tomatoes"
  );

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <button onClick={() => closeModal()}>X</button>
        <div className="title">
          <h1>{movie.Title}</h1>
          <p>{movie.Year}</p>
          <p>{movie.Runtime}</p>
          <p>{movie.Genre}</p>
          <p>{movie.Director}</p>
          <p>{movie.Writer}</p>
          <p>{movie.Actors}</p>
          <p>{movie.Plot}</p>
          {rottenTomatoesRating && (
            <p>Rotten Tomatoes Rating: {rottenTomatoesRating.Value}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Modal;
