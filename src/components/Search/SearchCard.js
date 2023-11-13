import React from "react";
import { Link } from "react-router-dom";
import imgUrl from "../../api/dataSource";
import moviePlaceholder from "../../assets/movie_placeholder.png";

const SearchCard = ({ movie }) => {
  return (
    <Link className="cardLink" to={`/movieDetail/${movie.id}`}>
      <main id="search-main-card">
        <img
          src={
            movie.poster_path ? imgUrl + movie.poster_path : moviePlaceholder
          }
          alt="This is poster image."
        />
        <div className="card-desc">
          <label className="card-title">
            {movie.title ? movie.title : movie.name}
          </label>
          <label className="card-date">{movie.release_date}</label>
          <p className="movie-desc">{movie.overview}</p>
        </div>
      </main>
    </Link>
  );
};

export default SearchCard;
