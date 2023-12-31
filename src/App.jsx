import "./App.css";
import Row from "./Row";
import requests from "./requests";
import Banner from "./Banner";
import Nav from "./Nav";
import Modal from "./InfoModal";
import { useState } from "react";
import axios from "./axios";
import LoginModal from "./LoginModal";
import Signup from "./Signup";

function App() {
  const jwt = localStorage.getItem("jwt");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [fetchingMovie, setFetchingMovie] = useState(false);
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [update, setUpdate] = useState(false);
  const [rowTitle, setRowTitle] = useState("");
  const resetUpdate = () => {
    setUpdate(false);
  };

  const openModal = async (movieId, title) => {
    setSelectedMovie(null);
    setIsModalOpen(true);
    await fetchMovieDetails(movieId);
    setRowTitle(title);
  };

  const fetchMovieDetails = async (movieId) => {
    if (!fetchingMovie) {
      setFetchingMovie(true);
      try {
        const response = await axios.get(`/movies/${movieId}`);
        setSelectedMovieId(movieId);
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

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const openSignupModal = () => {
    setIsSignupModalOpen(true);
  };

  const closeSignupModal = () => {
    setIsSignupModalOpen(false);
  };

  const addMovieToMyList = async (movieId) => {
    try {
      await axios.post(requests.fetchMyMovies, { movie_id: movieId });
      closeModal();
      setUpdate(true);
    } catch (error) {
      console.error("Error adding movie to your list:", error);
    }
  };

  const removeMovieFromMyList = async (movieId) => {
    try {
      await axios.delete(requests.fetchMyMovies + `?movie_id=${movieId}`);
      closeModal();
      setUpdate(true);
    } catch (error) {
      console.error("Error removing movie from your list:", error);
    }
  };

  return (
    <div className="app">
      <Nav
        openLoginModal={openLoginModal}
        openSignupModal={openSignupModal}
        jwt={jwt}
      />
      <Banner openModal={openModal} />
      <Row
        title="Too scared to choose? Let us pick for you"
        fetchUrl={requests.fetchRandomThree}
        openModal={openModal}
        fetchMovieDetails={fetchMovieDetails}
      />
      {jwt && (
        <Row
          title="My List"
          fetchUrl={requests.fetchMyMovies}
          openModal={openModal}
          fetchMovieDetails={fetchMovieDetails}
          update={update}
          resetUpdate={resetUpdate}
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
      {isModalOpen && selectedMovie && (
        <Modal
          movie={selectedMovie}
          movieId={selectedMovieId}
          closeModal={closeModal}
          addMovieToMyList={addMovieToMyList}
          removeMovieFromMyList={removeMovieFromMyList}
          jwt={jwt}
          rowTitle={rowTitle}
        />
      )}
      {isLoginModalOpen && (
        <LoginModal
          closeLoginModal={closeLoginModal}
          fetchLogin={requests.fetchSessions}
        />
      )}
      {isSignupModalOpen && (
        <Signup
          closeSignupModal={closeSignupModal}
          fetchSignup={requests.fetchSignup}
        />
      )}
    </div>
  );
}

export default App;
