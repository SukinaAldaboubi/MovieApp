import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import MovieCard from "./MovieCard";
import Trending from "./Trending";

const Home = () => {
  const apiKey = "92f280f02fb64ecc761b2833e7d041fa";
  const [popularMovies, setPopularMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [searchTxt, setSearchTxt] = useState("");
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState(-1);
  const [fav, setFav] = useState();

  useEffect(() => {
    getPopularMovies();
  }, [searchTxt, page]);

  async function getPopularMovies() {
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=${page}`;
    const response = await fetch(url);
    const movies = await response.json();

    if (searchTxt === "") {
      setPopularMovies(movies.results);
    }

    // if (filter == 1) {
    //     let s = movies.results.filter((movie) => movie.release_date).sort((a,b) => {
    //         return new Date(b.release_date).getMonth - new Date(a.release_date).getMonth
    //     });

    setPopularMovies(
      movies.results.filter((movie) => movie.title.includes(searchTxt))
    );
  }

  async function getMoviesGenre() {
    const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    setGenres(data.genres);
    console.log("This is genres " + genres);
  }

  const search = (title) => {
    setSearchTxt(title);
  };

  const rateFilter = () => {};

  const dateFilter = () => {};

  const generFilter = () => {
    getMoviesGenre();

    let genersList = (document.getElementById("gener-list").style.display =
      "flex");
  };

  const handleNextPage = (num) => {
    setPage(num);
  };

  const addToFavourite = (movieId) => {
    localStorage.removeItem("fav");
    let favMovies = [];
    try {
      if (localStorage.getItem("fav")) {
        favMovies = JSON.parse(localStorage.getItem("fav"));

        if (favMovies.length !== 0) {
          console.log("Is fav success " + favMovies.length);
          favMovies.map((id) => {
            //remove fav logic
            console.log("Movie item " + id);
            if (id === movieId) {
              console.log("Item is already here " + id);
              localStorage.setItem(
                "fav",
                JSON.stringify(favMovies.filter((id) => id !== movieId))
              );
              console.log(
                "Deletex Item is already here " +
                  favMovies.filter((id) => id !== movieId)
              );
            } else {
              //push fav logic
              console.log("push new fav");
              favMovies.push(movieId);
              localStorage.setItem("fav", JSON.stringify(favMovies));
            }
          });
        } else {
          //add first fav movie
          localStorage.setItem("fav", JSON.stringify([movieId]));
          console.log("This is in fav length == 0" + movieId);
        }
      } else {
        //add first fav movie
        localStorage.setItem("fav", JSON.stringify([movieId]));
        console.log("This is in fav  first item" + movieId);
      }
    } catch (error) {
      console.log("This is the error: " + error);
      return null;
    }
    let f = [];
    if (localStorage.getItem("fav")) {
      f = JSON.parse(localStorage.getItem("fav"));
      setFav(f);
      console.log("This is favMovies:: " + f);
    }
  };

  return (
    <section id="home">
      <Header handleSearch={search} />

      <Trending img={"/y8NtM6q3PzntqyNRNw6wgicwRYl.jpg"} />

      <div className="cards-section">
        {popularMovies.length === 0 ? (
          <p> No search results found </p>
        ) : (
          popularMovies.map((movie) => {
            return (
              <div key={movie.id} className="movie-Item">
                <MovieCard
                  movieInfo={movie}
                  addToFavourite={addToFavourite}
                  favMovies={fav}
                />
              </div>
            );
          })
        )}
      </div>

      <Footer handleNextPage={handleNextPage} />
    </section>
  );
};

export default Home;
