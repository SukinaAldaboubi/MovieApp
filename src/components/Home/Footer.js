import React, { useEffect, useState } from "react";

const Footer = ({ handleNextPage }) => {
  const [pageNums, setPageNums] = useState([]);

  useEffect(() => {
    let pages = [];
    for (let i = 1; i <= 10; i++) {
      pages.push(i);
    }
    setPageNums(pages);
  }, [pageNums]);

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
