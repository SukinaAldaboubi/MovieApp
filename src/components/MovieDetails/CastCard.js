import imgUrl from "../../api/dataSource";
import moviePlaceholder from "../../assets/movie_placeholder.png";
const CastCard = ({ cast }) => {
  return (
    <div id="cast-main">
      <img
        src={cast.profile_path ? imgUrl + cast.profile_path : moviePlaceholder}
        className="cast-img"
      />
      <div className="desc-section">
        <label className="cast-name">{cast.name}</label>
        <label className="character-name">{cast.character}</label>
      </div>
    </div>
  );
};

export default CastCard;
