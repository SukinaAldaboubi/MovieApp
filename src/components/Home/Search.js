import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import TrendingCard from "./TrendingCard";

const Search = () => {
  const apiKey = "92f280f02fb64ecc761b2833e7d041fa";
  const { searchText } = useParams();
  const noSearchQuery = searchText === "empty" ? true : false;
  const [searchQ, setSearchQ] = useState(searchText);
  const [genres, setGenres] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [filterResult, setFilterResult] = useState([]);
  const [isFilter, setIsFilter] = useState(false);
  const resultsToDisplay = isFilter ? filterResult : searchResult;

  useEffect(() => {
    getMoviesGenre();
    search();
  }, [searchQ]);

  //   useEffect(() => {
  //     setFilterResult([]);
  //   }, [isFilter]);

  async function getMoviesGenre() {
    const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    setGenres(data.genres);
  }

  async function search() {
    if (!noSearchQuery) {
      const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchQ}`;
      const response = await fetch(url);
      const data = await response.json();
      setSearchResult(data.results);
    }
  }

  const handleSearch = (e) => {
    setIsFilter(false);
    setSearchQ(e.target.value);
  };

  const handleFilter = (id) => {
    setIsFilter(true);
    let filteredArray = [];
    searchResult.forEach((result) => {
      if (result.genre_ids) {
        if (result.genre_ids.includes(id)) {
          filteredArray.push(result);
        }
      }
    });
    setFilterResult(filteredArray);
  };

  return (
    <div id="search-main">
      <div className="search-bar">
        <BsSearch className="search-icon" />
        <input
          type="text"
          defaultValue={!noSearchQuery ? searchQ : ""}
          placeholder="Search for a movie, tv show, person..."
          className="search-input"
          onChange={handleSearch}
        />
      </div>
      <div className="diveder" />

      <div className="content-section">
        <div className="filter-section">
          <div className="filter-content">
            <h3 className="filter-title">Filter by:</h3>
            <ul className="filter-list">
              {genres.map((genre) => {
                return (
                  <li
                    key={genre.id}
                    className="gener-item"
                    onClick={() => handleFilter(genre.id)}
                  >
                    {genre.name}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="result-section">
          {noSearchQuery || searchResult.length === 0 ? (
            <p>No Search results found...</p>
          ) : (
            resultsToDisplay.map((movie) => {
              return (
                <TrendingCard
                  key={movie.id}
                  className="movie-card"
                  movie={movie}
                />
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
