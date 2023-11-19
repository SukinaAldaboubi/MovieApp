import ImageLink from "../helpers/ImageLink";
import TitleValueCard from "../helpers/TitleValueCard";

const SideInfo = ({ socialMedias, sideInfos }) => {
  return (
    <div className="sideInfo-section">
      <div className="socail-media">
        {socialMedias.map((socialLink, index) => {
          return (
            <ImageLink
              key={index}
              type={socialLink.type}
              link={socialLink.link}
            />
          );
        })}
      </div>
      <div className="info-section">
        {sideInfos.map((sideInfo, index) => {
          return (
            <TitleValueCard
              key={index}
              title={sideInfo.title}
              value={sideInfo.value}
            />
          );
        })}
      </div>
    </div>
  );
};

export default SideInfo;
