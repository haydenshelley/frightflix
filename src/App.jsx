import "./App.css";
import Row from "./Row";
import requests from "./requests";
import Banner from "./Banner";

function App() {
  return (
    <div className="app">
      <Banner />
      <Row title="Not-So-Scary" fetchUrl={requests.fetchNotSoScary} />
      <Row title="Scary" fetchUrl={requests.fetchScary} />
      <Row title="Extremely Scary" fetchUrl={requests.fetchExtremelyScary} />
      <Row
        title="Too scared to choose? Let us pick for you"
        fetchUrl={requests.fetchRandomThree}
      />
    </div>
  );
}

export default App;
