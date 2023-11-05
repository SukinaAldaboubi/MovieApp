const apiKey = process.env.REACT_APP_API_KEY;

const imgUrl = `https://image.tmdb.org/t/p/original/`;
export default imgUrl;

export async function getTrendingMovies(selectedType, page) {
  const url = `https://api.themoviedb.org/3/trending/all/${selectedType}?api_key=${apiKey}&page=${page}`;
  const response = await fetch(url);
  const movies = await response.json();
  return movies;
}

export async function getMovieDetails(movieId) {
  const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`;
  const response = await fetch(url);
  const details = await response.json();
  return details;
}

export async function getMoviesGenre() {
  const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`;
  const response = await fetch(url);
  const data = await response.json();
  return data.genres;
}

export async function search(searchQ) {
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchQ}`;
  const response = await fetch(url);
  const data = await response.json();
  return data.results;
}
