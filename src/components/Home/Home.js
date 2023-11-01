import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Trending from "./Trending";

const Home = () => {
  const apiKey = "92f280f02fb64ecc761b2833e7d041fa";
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [searchTxt, setSearchTxt] = useState("");
  const [page, setPage] = useState(1);
  const [selectedType, setSelectedType] = useState("day");

  useEffect(() => {
    getTrendingMovies();
  }, [searchTxt, page, selectedType]);

  async function getTrendingMovies() {
    const url = `https://api.themoviedb.org/3/trending/all/${selectedType}?api_key=${apiKey}&page=${page}`;
    const response = await fetch(url);
    const movies = await response.json();

    if (searchTxt === "") {
      setTrendingMovies(movies.results);
      return;
    }

    let movieTitle = "";
    setTrendingMovies(
      movies.results.filter((movie) =>
        (movie.title ? movie.title : movie.name).includes(searchTxt)
      )
    );
  }

  const search = (title) => {
    setSearchTxt(title);
  };

  const handleNextPage = (num) => {
    setPage(num);
  };

  return (
    <section id="home">
      <Header handleSearch={search} />

      <Trending
        movies={trendingMovies}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
      />

      <Footer handleNextPage={handleNextPage} />
    </section>
  );
};

export default Home;
