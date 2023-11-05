import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { getMovieDetails } from "../../API/DataSource";
import imgUrl from "../../API/DataSource";

const MovieDetails = () => {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState({});
  const [favIds, setFavIds] = useState(() =>
    JSON.parse(localStorage.getItem("fav") || "[]")
  );
  const isFav = favIds.includes(movieId);

  useEffect(() => {
    console.log("Movie id = " + movieId);
    loadMovieDetails();
  }, []);

  async function loadMovieDetails() {
    setMovieDetails(await getMovieDetails(movieId));
  }

  const handleFav = () => {
    if (!isFav) {
      const newStorageItem = [...favIds, movieId];
      setFavIds(newStorageItem);
      localStorage.setItem("fav", JSON.stringify(newStorageItem));
    } else {
      const newStorageItem = favIds.filter((favId) => favId !== movieId);
      setFavIds(newStorageItem);
      localStorage.setItem("fav", JSON.stringify(newStorageItem));
    }
  };

  const getDetails = () => {
    const time = movieDetails.runtime;
    const [hours, minutes] = [Math.floor(time / 60), time % 60];

    let genres = [];
    if (movieDetails.genres) {
      movieDetails.genres.forEach((genre, index) => {
        genres.push(
          genre.name + (index + 1 === movieDetails.genres.length ? "" : ", ")
        );
      });
    }

    return {
      year: new Date(movieDetails.release_date).getFullYear(),
      rate: parseInt(movieDetails.vote_average * 10, 10),
      hours: hours,
      minutes: minutes,
      genres: genres,
      backgroundImg: movieDetails.backdrop_path,
    };
  };

  return (
    <div id="main">
      <img
        src={imgUrl + getDetails().backgroundImg}
        className="background-img"
      />
      <div id="main-content">
        <div className="content-section">
          <img src={imgUrl + movieDetails.poster_path} className="movie-img" />
          <div className="movie-details">
            <div className="title-section">
              <h1 className="title">
                {movieDetails.title}{" "}
                <label className="year">({getDetails().year})</label>{" "}
              </h1>
            </div>
            <div className="details">
              <label className="date">{movieDetails.release_date}</label>
              <div className="circle-sep" />
              <label className="movie-type">{getDetails().genres}</label>
              <div className="circle-sep" />
              <label className="time">
                {getDetails().hours}h {getDetails().minutes}m
              </label>
            </div>
            <div className="actions">
              <div className="rate">
                <label className="rate-value">{getDetails().rate}%</label>
              </div>
              <button className="fav" onClick={handleFav}>
                {isFav ? (
                  <AiFillHeart className="favIcon"></AiFillHeart>
                ) : (
                  <AiOutlineHeart className="favIcon"></AiOutlineHeart>
                )}
              </button>
            </div>
            <div className="overview-section">
              <h3 className="overview-lbl">Overview</h3>
              <p className="overview">{movieDetails.overview}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
