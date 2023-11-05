import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Trending from "./Trending";
import { getTrendingMovies } from "../../API/DataSource";

const Home = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [searchTxt, setSearchTxt] = useState("");
  const [page, setPage] = useState(1);
  const [selectedType, setSelectedType] = useState("day");

  useEffect(() => {
    loadTrendingMovies();
  }, [searchTxt, page, selectedType]);

  async function loadTrendingMovies() {
    const movies = await getTrendingMovies(selectedType, page);

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
