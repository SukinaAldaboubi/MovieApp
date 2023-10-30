import React from "react";
import TrendingCard from "./TrendingCard";
import { OptionButtons } from "../Helpers/OptionButtons";

const Trending = ({ img }) => {
  return (
    <main id="trending-main" className="trending-main">
      <div className="header-section">
        <h2>Trending</h2>
        <div className="options-section">
          <OptionButtons />
        </div>
      </div>
      <div className="trending-data">
        <TrendingCard className="trending-card" img={img} />
        <TrendingCard className="trending-card" img={img} />
        <TrendingCard className="trending-card" img={img} />
        <TrendingCard className="trending-card" img={img} />
        <TrendingCard className="trending-card" img={img} />
        <TrendingCard className="trending-card" img={img} />
        <TrendingCard className="trending-card" img={img} />
        <TrendingCard className="trending-card" img={img} />
        <TrendingCard className="trending-card" img={img} />
        <TrendingCard className="trending-card" img={img} />
        <TrendingCard className="trending-card" img={img} />
        <TrendingCard className="trending-card" img={img} />
        <TrendingCard className="trending-card" img={img} />
        <TrendingCard className="trending-card" img={img} />
      </div>
    </main>
  );
};

export default Trending;
