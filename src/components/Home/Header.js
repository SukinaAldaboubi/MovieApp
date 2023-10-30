import React from "react";

const Header = ({ handleSearch }) => {
  var searchTxt = "";
  const searchChange = (e) => {
    searchTxt = e.target.value;
  };

  return (
    <header>
      <div className="title-section">
        <h1>Welcome!</h1>
        <h2>Millions of movies, TV shows and people to discove.</h2>
      </div>

      <div className="search-container">
        <input type="text" placeholder="Search.." onChange={searchChange} />
        <button className="search-btn" onClick={() => handleSearch(searchTxt)}>
          Search
        </button>
      </div>
    </header>
  );
};

export default Header;
