import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

const MovieDetails = () => {
  const { movieId } = useParams();
  const apiKey = "92f280f02fb64ecc761b2833e7d041fa";
  const [movieDetails, setMovieDetails] = useState({});
  const imgUrl = `https://image.tmdb.org/t/p/original/`;
  const [favIds, setFavIds] = useState(() =>
    JSON.parse(localStorage.getItem("fav") || "[]")
  );
  const isFav = favIds.includes(movieId);

  useEffect(() => {
    getMovieDetails();
  }, []);

  async function getMovieDetails() {
    const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`;
    const response = await fetch(url);
    const details = await response.json();

    setMovieDetails(details);
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
    const year = new Date(movieDetails.release_date).getFullYear();
    const rate = parseInt(movieDetails.vote_average * 10, 10);
    const time = movieDetails.runtime;
    const [hours, minutes] = [Math.floor(time / 60), time % 60];
    const backgroundImg = movieDetails.backdrop_path;

    let genres = [];
    if (movieDetails.genres) {
      movieDetails.genres.forEach((genre, index) => {
        genres.push(
          genre.name + (index + 1 === movieDetails.genres.length ? "" : ", ")
        );
      });
    }
    console.log("IMG URL " + imgUrl + backgroundImg);

    return {
      year: year,
      rate: rate,
      hours: hours,
      minutes: minutes,
      genres: genres,
      backgroundImg: backgroundImg,
    };
  };

  return (
    <div
      id="main"
      style={{
        backgroundImage: `url(${imgUrl + getDetails().backgroundImg})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div className="content-section">
        <img src={imgUrl + movieDetails.poster_path} className="movie-img" />
        <div className="movie-details">
          <div className="title-section">
            <h1 className="title">
              {movieDetails.title}{" "}
              <label className="year">({getDetails().year})</label>{" "}
            </h1>
            {/* <label className="year">({getDetails().year})</label> */}
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
  );
};

export default MovieDetails;
