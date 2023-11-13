import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { search, getMoviesGenre } from "../../api/dataSource";
import SearchCard from "./SearchCard";
import SearchPagination from "./SearchPagination";

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
  const [selectedFilter, setSelectedFilter] = useState();
  const resultsToDisplay = isFilter ? filterResult : searchResult;
  const [page, setPage] = useState(1);
  const [totalPages, setTotalNumOfPages] = useState(0);

  useEffect(() => {
    loadMoviesGenre();
    handleSearch();
  }, [searchQ, page]);

  async function loadMoviesGenre() {
    setGenres(await getMoviesGenre());
  }

  async function handleSearch() {
    if (!searchQueryStatus) {
      await search(searchQ, page, setSearchResult, setTotalNumOfPages);
    }
  }

  const searchDidChange = (e) => {
    setSelectedFilter(null);
    setSearchQueryStatus(e.target.value ? false : true);
    setIsFilter(false);
    setSearchQ(e.target.value);
  };

  const handleFilter = (id) => {
    setIsFilter(true);
    setSelectedFilter(id);
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
                    id="gener-item"
                    className={
                      selectedFilter == genre.id
                        ? "selectedItem"
                        : "notSelectedItem"
                    }
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
                <SearchCard
                  key={movie.id}
                  className="search-card"
                  movie={movie}
                />
              );
            })
          )}
          <SearchPagination
            // handleNextPage={handleNextPage}
            page={page}
            setPage={setPage}
            totalPages={totalPages}
          />
        </div>
      </div>
    </div>
  );
};

export default Search;
