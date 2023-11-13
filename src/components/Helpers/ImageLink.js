import { BsLink, BsFacebook } from "react-icons/bs";
import { AiOutlineTwitter } from "react-icons/ai";
import { FiInstagram } from "react-icons/fi";

const ImageLink = ({ type, link }) => {
  const getIcon = () => {
    if (type === "facebook") {
      return <BsFacebook className="link-icon" />;
    }
    if (type === "twitter") {
      return <AiOutlineTwitter className="link-icon" />;
    }
    if (type === "instagram") {
      return <FiInstagram className="link-icon" />;
    }
    if (type === "homepage") {
      return <BsLink className="link-icon" />;
    }
  };

  return (
    <div className="image-section">
      {type === "homepage" ? (
        <div className="offical-links">
          <div className="links-diveder" />
          <a href={link} target="_blank">
            {getIcon()}
          </a>
        </div>
      ) : (
        <a href={link} target="_blank">
          {getIcon()}
        </a>
      )}
    </div>
  );
};
export default ImageLink;
