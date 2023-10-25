import "./App.css";
import Row from "./Row";
import requests from "./requests";
import Banner from "./Banner";
import Nav from "./Nav";
import Modal from "./Modal";
import { useState } from "react";
import axios from "./axios";

function App() {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fetchingMovie, setFetchingMovie] = useState(false);

  const openModal = async (movieId) => {
    setSelectedMovie(null);
    setIsModalOpen(true);
    await fetchMovieDetails(movieId);
  };

  const closeModal = () => {
    setSelectedMovie(null);
    setIsModalOpen(false);
  };

  const fetchMovieDetails = async (movieId) => {
    if (!fetchingMovie) {
      setFetchingMovie(true);
      try {
        const response = await axios.get(`/movies/${movieId}`);
        setSelectedMovie(response.data);
        setFetchingMovie(false);
      } catch (error) {
        setFetchingMovie(false);
      }
    }
  };

  return (
    <div className="app">
      <Nav />
      <Banner />
      <Row
        title="Not-So-Scary"
        fetchUrl={requests.fetchNotSoScary}
        openModal={openModal}
        fetchMovieDetails={fetchMovieDetails}
      />
      <Row
        title="Scary"
        fetchUrl={requests.fetchScary}
        openModal={openModal}
        fetchMovieDetails={fetchMovieDetails}
      />
      <Row
        title="Extremely Scary"
        fetchUrl={requests.fetchExtremelyScary}
        openModal={openModal}
        fetchMovieDetails={fetchMovieDetails}
      />
      <Row
        title="Too scared to choose? Let us pick for you"
        fetchUrl={requests.fetchRandomThree}
        openModal={openModal}
        fetchMovieDetails={fetchMovieDetails}
      />
      {isModalOpen && selectedMovie && (
        <Modal movie={selectedMovie} closeModal={closeModal} />
      )}
    </div>
  );
}

export default App;
