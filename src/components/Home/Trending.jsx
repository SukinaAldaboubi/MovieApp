import React from "react";
import TrendingCard from "./TrendingCard";
import OptionButtons from "../helpers/OptionButtons";

const Trending = ({
  movies,
  selectedType,
  setSelectedType,
  loading,
  setLoading,
}) => {
  return (
    <main id="trending-main">
      <div className="header-section">
        <h2>Trending</h2>
        <div className="options-section">
          <OptionButtons
            selectedType={selectedType}
            setSelectedType={setSelectedType}
            setLoading={setLoading}
          />
        </div>
      </div>

      {loading ? (
        <p className="loadingLbl">Loading... </p>
      ) : (
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
          <div className="fadeOutDiv" />
        </div>
      )}
    </main>
  );
};

export default Trending;
