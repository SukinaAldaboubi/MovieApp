const TitleValueCard = ({ title, value }) => {
  return (
    <div className="title-value-section">
      <label className="titleLbl">{title}</label>
      <label className="valueLbl">{value}</label>
    </div>
  );
};
export default TitleValueCard;
