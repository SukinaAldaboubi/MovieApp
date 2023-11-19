import React, { useEffect, useState } from "react";
import { HomeHeader } from "../Home";
import { Trending } from "../Home";
import { getTrendingMovies } from "../../api/dataSource";

const Home = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [searchTxt, setSearchTxt] = useState("");
  const [selectedType, setSelectedType] = useState("day");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTrendingMovies();
  }, [searchTxt, selectedType]);

  async function loadTrendingMovies() {
    const movies = await getTrendingMovies(selectedType, setLoading);

    if (searchTxt === "") {
      setTrendingMovies(movies.results);
      return;
    }

    setTrendingMovies(
      movies.results.filter((movie) =>
        (movie.title ? movie.title : movie.name).includes(searchTxt)
      )
    );
  }

  const search = (title) => {
    setSearchTxt(title);
  };

  return (
    <section id="home">
      <HomeHeader handleSearch={search} />

      <Trending
        movies={trendingMovies}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        loading={loading}
        setLoading={setLoading}
      />
    </section>
  );
};

export default Home;
