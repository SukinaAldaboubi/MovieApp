import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import {
  getMovieDetails,
  getMovieCredits,
  getExternalIds,
} from "../../api/dataSource";
import imgUrl from "../../api/dataSource";
import CastCard from "./CastCard";
import { facebookUrl, instagramUrl, twitterUrl } from "../../api/global";
import ImageLink from "../helpers/ImageLink";
import TitleValueCard from "../helpers/TitleValueCard";
import CircleProgress from "../helpers/CircleProgress";

const MovieDetails = () => {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState({});
  const [movieCredits, setMovieCredits] = useState({});
  const [externalIds, setExternalIds] = useState({});
  const [favIds, setFavIds] = useState(() =>
    JSON.parse(localStorage.getItem("fav") || "[]")
  );
  const isFav = favIds.includes(movieId);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMovieDetails();
  }, []);

  async function loadMovieDetails() {
    await getMovieDetails(movieId, setMovieDetails, setError, setLoading);
    await getMovieCredits(movieId, setMovieCredits);
    await getExternalIds(movieId, setExternalIds);
  }

  const handleFav = () => {
    let newStorageItem = [];
    if (!isFav) {
      newStorageItem = [...favIds, movieId];
      setFavIds(newStorageItem);
    } else {
      newStorageItem = favIds.filter((favId) => favId !== movieId);
      setFavIds(newStorageItem);
    }
    localStorage.setItem("fav", JSON.stringify(newStorageItem));
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
    };
  };

  const getCrew = () => {
    let crewArr = [];
    if (movieCredits.crew) {
      movieCredits.crew.forEach((crew) => {
        if (
          crew.job === "Novel" ||
          crew.job === "Screenplay" ||
          crew.job === "Director"
        ) {
          crewArr.push(crew);
        }
      });
    }
    return crewArr;
  };

  const getCast = () => {
    let castArr = [];
    if (movieCredits.cast) {
      movieCredits.cast.forEach((cast) => {
        castArr.push(cast);
      });
    }
    return castArr;
  };

  const getSideInfo = () => {
    let sideInfo = [];
    if (movieDetails.status) {
      sideInfo.push({ title: "Status", value: movieDetails.status });
    }

    if (movieDetails.original_language) {
      sideInfo.push({
        title: "Original Language",
        value: movieDetails.original_language === "en" ? "English" : "",
      });
    }

    if (movieDetails.budget) {
      sideInfo.push({
        title: "Budget",
        value:
          "$" +
          movieDetails.budget
            .toFixed(2)
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"),
      });
    }

    if (movieDetails.revenue) {
      sideInfo.push({
        title: "Revenue",
        value:
          "$" +
          movieDetails.revenue
            .toFixed(2)
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"),
      });
    }
    return sideInfo;
  };

  const getSocialLinks = () => {
    let socialLinks = [];

    if (externalIds.facebook_id) {
      socialLinks.push({
        type: "facebook",
        link: facebookUrl + externalIds.facebook_id,
      });
    }
    if (externalIds.instagram_id) {
      socialLinks.push({
        type: "instagram",
        link: instagramUrl + externalIds.instagram_id,
      });
    }
    if (externalIds.twitter_id) {
      socialLinks.push({
        type: "twitter",
        link: twitterUrl + externalIds.twitter_id,
      });
    }

    if (movieDetails.homepage) {
      socialLinks.push({
        type: "homepage",
        link: movieDetails.homepage,
      });
    }
    return socialLinks;
  };

  if (error) {
    return <p className="errorLbl">{error}</p>;
  }

  if (loading) {
    return <p className="loadingLbl">Loading..</p>;
  }

  return (
    <div id="main">
      <div id="details-main">
        <img
          src={imgUrl + movieDetails.backdrop_path}
          className="background-img"
        />
        <div id="main-content">
          <div className="content-section">
            <img
              src={imgUrl + movieDetails.poster_path}
              className="movie-img"
            />
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
                <div className="rate-section">
                  <div className="rate">
                    <label className="rate-value">{getDetails().rate}%</label>

                    <CircleProgress
                      percentage={getDetails().rate}
                      cx="24px"
                      cy="24px"
                      r="24px"
                      strokeWidth="3px"
                    />
                  </div>

                  <label className="userScore">User Score</label>
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
                <label className="tagLine">{movieDetails.tagline}</label>
                <h3 className="overview-lbl">Overview</h3>
                <p className="overview">{movieDetails.overview}</p>
              </div>
              <div className="crew-section">
                {getCrew().map((crew) => (
                  <div className="crew-info">
                    <h5 className="crew-name">{crew.name}</h5>
                    <label className="crew-job">{crew.job}</label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="cast-side-info">
        <div className="cast-section">
          <h3>Top Billed Cast</h3>
          <div className="cast-data">
            {getCast().map((cast) => {
              return <CastCard cast={cast} />;
            })}
          </div>
        </div>

        <div className="sideInfo-section">
          <div className="socail-media">
            {getSocialLinks().map((socialLink) => {
              return (
                <ImageLink type={socialLink.type} link={socialLink.link} />
              );
            })}
          </div>
          <div className="info-section">
            {getSideInfo().map((sideInfo) => {
              return (
                <TitleValueCard title={sideInfo.title} value={sideInfo.value} />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
