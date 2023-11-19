import { CastCard } from ".";

const Casts = ({ casts }) => {
  return (
    <div className="cast-section">
      <h3>Top Billed Cast</h3>
      <div className="cast-data">
        {casts.map((cast, index) => {
          return <CastCard key={index} cast={cast} />;
        })}
      </div>
    </div>
  );
};

export default Casts;
