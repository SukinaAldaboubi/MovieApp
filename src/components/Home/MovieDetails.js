import React from "react";
import { useSelector } from "react-redux";

const MovieDetails = () => {
  const imgUrl = `https://image.tmdb.org/t/p/original/`;
  const movieTitle = useSelector((state) => state.home.movieTitle);
  const movieImg = useSelector((state) => state.home.movieImg);
  const movieOverView = useSelector((state) => state.home.movieOverView);
  const movieReleaseDate = useSelector((state) => state.home.movieReleaseDate);

  return (
    <div id="main">
      <img src={imgUrl + movieImg} />
      <div className="info-section">
        <h3>{movieTitle}</h3>
        <label>{movieReleaseDate}</label>
        <p>{movieOverView} </p>
      </div>
    </div>
  );
};

export default MovieDetails;
