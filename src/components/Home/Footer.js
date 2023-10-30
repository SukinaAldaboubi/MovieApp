import React from "react";

const Footer = ({ handleNextPage }) => {
  const count = 10;
  const pageNums = [];

  for (let i = 1; i <= count; i++) {
    pageNums.push(i);
  }

  return (
    <div id="pages-container">
      <ul className="num-container">
        {pageNums.map((num) => (
          <li key={num}>
            <button onClick={() => handleNextPage(num)}>{num}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Footer;
