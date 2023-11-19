import React from "react";
import { Link } from "react-router-dom";
import imgUrl from "../../api/dataSource";
import moviePlaceholder from "../../assets/movie_placeholder.png";
import CircleProgress from "../helpers/CircleProgress";

const TrendingCard = ({ movie }) => {
  const percentage = parseInt(movie.vote_average * 10, 10);
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
            <label className="rate-value">{percentage}%</label>
            <CircleProgress
              percentage={percentage}
              cx="24px"
              cy="24px"
              r="24px"
              strokeWidth="3px"
            />
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
