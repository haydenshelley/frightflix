import "./Modal.css";

function Modal({ movie, closeModal }) {
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <button onClick={() => closeModal()}>X</button>
        <div className="title">
          <h1>{movie.title}</h1>
        </div>
        <div className="body">
          <p>{movie.description}</p>
        </div>
      </div>
    </div>
  );
}

export default Modal;
