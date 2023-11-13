const apiKey = process.env.REACT_APP_API_KEY;

const imgUrl = `https://image.tmdb.org/t/p/original/`;
export default imgUrl;

export async function getTrendingMovies(selectedType, setLoading) {
  const url = `https://api.themoviedb.org/3/trending/all/${selectedType}?api_key=${apiKey}`;
  const response = await fetch(url);
  const movies = await response.json();
  setLoading(false);
  return movies;
}

export async function getMovieDetails(
  movieId,
  setMovieDetails,
  setError,
  setLoading
) {
  try {
    const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`;
    const response = await fetch(url);
    const details = await response.json();
    setLoading(false);
    if (details.success != null) {
      if (!details.success) {
        setError(details.status_message);
      }
    } else {
      setMovieDetails(details);
    }
  } catch (error) {
    setError(error);
  }
}

export async function getMoviesGenre() {
  const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`;
  const response = await fetch(url);
  const data = await response.json();
  return data.genres;
}

export async function search(
  searchQ,
  page,
  setSearchResult,
  setTotalNumOfPages
) {
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchQ}&page=${page}`;
  const response = await fetch(url);
  const data = await response.json();
  setSearchResult(data.results);
  setTotalNumOfPages(data.total_pages);
}

export async function getMovieCredits(movieId, setMovieCredits) {
  const url = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}`;
  const response = await fetch(url);
  const data = await response.json();
  setMovieCredits(data);
}

export async function getExternalIds(movieId, setExternalIds) {
  const url = `https://api.themoviedb.org/3/movie/${movieId}/external_ids?api_key=${apiKey}`;
  const response = await fetch(url);
  const data = await response.json();
  setExternalIds(data);
}
