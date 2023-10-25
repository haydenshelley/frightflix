import "./App.css";
import Row from "./Row";
import requests from "./requests";
import Banner from "./Banner";
import Nav from "./Nav";
import Modal from "./Modal";
import { useState } from "react";

function App() {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedMovie(null);
    setIsModalOpen(false);
  };

  return (
    <div className="app">
      <Nav />
      <Banner />
      <Row
        title="Not-So-Scary"
        fetchUrl={requests.fetchNotSoScary}
        openModal={openModal}
      />
      <Row title="Scary" fetchUrl={requests.fetchScary} openModal={openModal} />
      <Row
        title="Extremely Scary"
        fetchUrl={requests.fetchExtremelyScary}
        openModal={openModal}
      />
      <Row
        title="Too scared to choose? Let us pick for you"
        fetchUrl={requests.fetchRandomThree}
        openModal={openModal}
      />
      {isModalOpen && <Modal movie={selectedMovie} closeModal={closeModal} />}
    </div>
  );
}

export default App;
