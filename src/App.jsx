import "./App.css";
import Row from "./Row";
import requests from "./requests";
import Banner from "./Banner";
import Nav from "./Nav";
import Modal from "./InfoModal";
import { useState } from "react";
import axios from "./axios";
import LoginModal from "./LoginModal";

function App() {
  const jwt = localStorage.getItem("jwt");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [fetchingMovie, setFetchingMovie] = useState(false);

  const openModal = async (movieId) => {
    setSelectedMovie(null);
    setIsModalOpen(true);
    await fetchMovieDetails(movieId);
  };

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
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

  const closeModal = () => {
    setSelectedMovie(null);
    setIsModalOpen(false);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  return (
    <div className="app">
      <Nav openLoginModal={openLoginModal} jwt={jwt} />
      <Banner openModal={openModal} />
      {jwt && (
        <Row
          title="My List"
          fetchUrl={requests.fetchMyMovies}
          openModal={openModal}
          fetchMovieDetails={fetchMovieDetails}
        />
      )}
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
      {isLoginModalOpen && (
        <LoginModal
          closeLoginModal={closeLoginModal}
          fetchLogin={requests.fetchSessions}
        />
      )}
    </div>
  );
}

export default App;
