import React from "react";

const OptionButtons = ({ selectedType, setSelectedType, setLoading }) => {
  const changeColor = (btn) => {
    setLoading(true);
    setSelectedType(btn);
  };

  return (
    <>
      <button
        className={selectedType === "day" ? "selected" : "notSelected"}
        onClick={() => changeColor("day")}
      >
        Today
      </button>
      <button
        className={selectedType === "week" ? "selected" : "notSelected"}
        onClick={() => changeColor("week")}
      >
        This week
      </button>
    </>
  );
};

export default OptionButtons;
