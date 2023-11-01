import React from "react";
import { Link } from "react-router-dom";

const TrendingCard = ({ movie }) => {
  const imgUrl = `https://image.tmdb.org/t/p/original/`;
  const movieName = movie.title ? movie.title : movie.name;
  const movieDate = movie.release_date;
  const rate = parseInt(movie.vote_average * 10, 10);
  const img = imgUrl + movie.poster_path;
  const movieId = movie.id;

  return (
    <Link className="cardLink" to={`/movieDetail/${movieId}`}>
      <main id="trending-main-card">
        <img src={img} alt="This is poster image." />
        <div className="card-desc">
          <div className="rate-view">
            <label className="rate-value">{rate}%</label>
          </div>
          <label className="card-title">{movieName}</label>
          <label className="card-date">{movieDate}</label>
        </div>
      </main>
    </Link>
  );
};

export default TrendingCard;
