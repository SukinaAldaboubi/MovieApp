import React, { useState } from "react";
import TrendingCard from "./TrendingCard";
import OptionButtons from "../Helpers/OptionButtons";

const Trending = ({ movies, selectedType, setSelectedType }) => {
  return (
    <main id="trending-main">
      {movies.length === 0 ? (
        <p> No search results found </p>
      ) : (
        <>
          <div className="header-section">
            <h2>Trending</h2>
            <div className="options-section">
              <OptionButtons
                selectedType={selectedType}
                setSelectedType={setSelectedType}
              />
            </div>
          </div>

          <div className="trending-data">
            {movies.map((movie) => {
              return (
                <TrendingCard
                  key={movie.id}
                  className="trending-card"
                  movie={movie}
                />
              );
            })}
          </div>
        </>
      )}
    </main>
  );
};

export default Trending;
