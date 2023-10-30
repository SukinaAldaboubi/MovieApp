import React from "react";

const TrendingCard = ({ img }) => {
  const imgUrl = `https://image.tmdb.org/t/p/original/`;

  return (
    <main id="trending-main-card">
      <img src={imgUrl + img} />
      <div className="card-desc">
        <div className="rate-view">
          <label className="rate-value">63%</label>
        </div>
        <label className="card-title">
          Harry Potter Harry Potter Harry Potter
        </label>
        <label className="card-date">Oct, 22 2023</label>
      </div>
    </main>
  );
};

export default TrendingCard;
