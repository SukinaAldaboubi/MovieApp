import React from "react";
import { Link } from "react-router-dom";
import imgUrl from "../../API/DataSource";
import moviePlaceholder from "../../assets/movie_placeholder.png";

const TrendingCard = ({ movie }) => {
  return (
    <Link className="cardLink" to={`/movieDetail/${movie.id}`}>
      <main id="trending-main-card">
        <img
          src={
            movie.poster_path ? imgUrl + movie.poster_path : moviePlaceholder
          }
          alt="This is poster image."
        />
        <div className="card-desc">
          <div className="rate-view">
            <label className="rate-value">
              {parseInt(movie.vote_average * 10, 10)}%
            </label>
          </div>
          <label className="card-title">
            {movie.title ? movie.title : movie.name}
          </label>
          <label className="card-date">{movie.release_date}</label>
        </div>
      </main>
    </Link>
  );
};

export default TrendingCard;
