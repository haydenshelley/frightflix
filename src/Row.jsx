import { useState, useEffect, useRef } from "react";
import axios from "./axios";
import "./Row.css";

function Row({ title, fetchUrl, openModal }) {
  const [movies, setMovies] = useState([]);
  const rowRef = useRef(null);

  let interval = null;

  const startScrollingLeft = () => {
    interval = setInterval(() => {
      if (rowRef.current) {
        rowRef.current.scrollLeft -= 5;
      }
    }, 50);
  };

  const startScrollingRight = () => {
    interval = setInterval(() => {
      if (rowRef.current) {
        rowRef.current.scrollLeft += 5;
      }
    }, 50);
  };

  const stopScrolling = () => {
    clearInterval(interval);
  };

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  return (
    <div className="row">
      <h2
        className={
          title === "Too scared to choose? Let us pick for you"
            ? "centered-title"
            : ""
        }
      >
        {title}
      </h2>
      {title !== "Too scared to choose? Let us pick for you" && (
        <>
          <div
            className="scroll-button left"
            onMouseOver={startScrollingLeft}
            onMouseOut={stopScrolling}
          >
            &#8249;
          </div>
          <div
            className="scroll-button right"
            onMouseOver={startScrollingRight}
            onMouseOut={stopScrolling}
          >
            &#8250;
          </div>
        </>
      )}
      <div
        className={`row_posters ${
          title === "Too scared to choose? Let us pick for you"
            ? "centered-posters"
            : ""
        }`}
        ref={rowRef}
      >
        {movies.map((movie) => (
          <img
            key={movie.id}
            className="row_poster"
            src={movie.image}
            alt={movie.title}
            onClick={() => openModal(movie)}
          />
        ))}
      </div>
    </div>
  );
}

export default Row;
