import React, { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [searchText, setSearchText] = useState("empty");
  const searchChange = (e) => {
    setSearchText(e.target.value);
  };

  return (
    <header>
      <div className="title-section">
        <h1>Welcome!</h1>
        <h2>Millions of movies, TV shows and people to discove.</h2>
      </div>

      <div className="search-container">
        <input type="text" placeholder="Search.." onChange={searchChange} />
        <Link className="search-btn" to={`/search/${searchText}`}>
          Search
        </Link>
        ;
      </div>
    </header>
  );
};

export default Header;
