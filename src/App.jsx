import "./App.css";
import Row from "./Row";
import requests from "./requests";

function App() {
  return (
    <>
      <h1>FrightFlix</h1>
      <Row title="Not-So-Scary" fetchUrl={requests.fetchNotSoScary} />
      <Row title="Scary" fetchUrl={requests.fetchScary} />
      <Row title="Extremely Scary" fetchUrl={requests.fetchExtremelyScary} />
    </>
  );
}

export default App;
