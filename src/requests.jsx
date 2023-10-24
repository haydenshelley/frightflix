const requests = {
  fetchIndex: `http://localhost:3000/movies.json`,
  fetchNotSoScary: `localhost:3000/movies/category/not-so-scary.json`,
  fetchScary: `localhost:3000/movies/category/scary.json`,
  fetchExtremelyScary: `localhost:3000/movies/category/scary.json`,
  fetchShow: `localhost:3000/movies/:id`,
  fetchRandomNotSoScary: `localhost:3000/movies/random/not-so-scary.json`,
  fetchRandomScary: `localhost:3000/movies/random/scary.json`,
  fetchRandomExtremelyScary: `localhost:3000/movies/random/extremely-scary.json`,
};

export default requests;
