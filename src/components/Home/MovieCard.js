import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { homeActions } from "../../store/homeSlice";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

const MovieCard = ({ movieInfo, addToFavourite, fav }) => {
  const dispatch = useDispatch();
  const imgUrl = `https://image.tmdb.org/t/p/original/`;
  const movieTitle = movieInfo.title;
  const movieImg = movieInfo.poster_path;
  const movieOverView = movieInfo.overview;
  const movieReleaseDate = movieInfo.release_date;

  const handleDetails = (e) => {
    dispatch(
      homeActions.setPopularMovies({
        movieTitle,
        movieImg,
        movieOverView,
        movieReleaseDate,
      })
    );
  };

  const isFav = () => {
    // console.log("This is favMovies in cards " + fav)
    if (fav) {
      console.log("This is favMovies in cards " + fav.length);
      fav.map((id) => {
        console.log("THIS IS TRUE");
        return id === movieInfo.id ? true : false;
      });
      return false;
    }
  };

  return (
    <div id="movie-main-card">
      <Link
        id="2"
        className="cardLink"
        to="/movieDetail"
        onClick={(e) => handleDetails()}
      >
        <div className="movie-card-info">
          <button
            id="1"
            onClick={() => {
              addToFavourite(movieInfo.id);
            }}
          >
            {isFav() ? (
              <AiFillHeart className="addToFav" />
            ) : (
              <AiOutlineHeart className="addToFav" />
            )}
          </button>
          <img src={imgUrl + movieInfo.poster_path} />
          <h3>{movieInfo.title}</h3>
          <p>{movieInfo.overview} </p>
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;
