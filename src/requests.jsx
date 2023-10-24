const requests = {
  fetchIndex: `/movies.json`,
  fetchNotSoScary: `/movies/category/not-so-scary.json`,
  fetchScary: `/movies/category/scary.json`,
  fetchExtremelyScary: `/movies/category/extremely-scary.json`,
  fetchShow: `/movies/:id`,
  fetchRandomNotSoScary: `/movies/random/not-so-scary.json`,
  fetchRandomScary: `/movies/random/scary.json`,
  fetchRandomExtremelyScary: `/movies/random/extremely-scary.json`,
};

export default requests;
