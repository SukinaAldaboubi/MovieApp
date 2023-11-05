import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import TrendingCard from "./TrendingCard";
import { search, getMoviesGenre } from "../../API/DataSource";

const Search = () => {
  const { searchText } = useParams();
  const [searchQueryStatus, setSearchQueryStatus] = useState(
    searchText === "empty" ? true : false
  );
  const [searchQ, setSearchQ] = useState(searchText);
  const [genres, setGenres] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [filterResult, setFilterResult] = useState([]);
  const [isFilter, setIsFilter] = useState(false);
  const resultsToDisplay = isFilter ? filterResult : searchResult;

  useEffect(() => {
    loadMoviesGenre();
    handleSearch();
  }, [searchQ]);

  async function loadMoviesGenre() {
    setGenres(await getMoviesGenre());
  }

  async function handleSearch() {
    if (!searchQueryStatus) {
      setSearchResult(await search(searchQ));
    }
  }

  const searchDidChange = (e) => {
    setSearchQueryStatus(e.target.value ? false : true);
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
          defaultValue={!searchQueryStatus ? searchQ : ""}
          placeholder="Search for a movie, tv show, person..."
          className="search-input"
          onChange={searchDidChange}
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
          {searchQueryStatus || searchResult.length === 0 ? (
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
