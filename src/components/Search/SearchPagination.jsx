import React, { useEffect, useState } from "react";

const SearchPagination = ({ page, setPage, totalPages }) => {
  const [pageNum, setpageNum] = useState([]);
    
  const pages = pageNum.reduce((acc, num) => {
      acc.push(num);
      return acc;
  }, pageNum);
  

  useEffect(() => {
    setpageNum(pages);
  }, []);
  

  return (
    <div id="pages-container">
      {page != 1 ? (
        <button className="previous" onClick={() => setPage(page - 1)}>
          Previous
        </button>
      ) : (
        ""
      )}

      <ul className="num-container">
        {pageNum.map((num) =>
          num === 8 ? (
            <p>...</p>
          ) : num > 7 ? (
            num === totalPages || totalPages - 1 === num ? (
              <li key={num}>
                <button
                  className={page === num ? "selected" : "notSelected"}
                  onClick={() => setPage(num)}
                >
                  {num}
                </button>
              </li>
            ) : (
              ""
            )
          ) : (
            <li key={num}>
              <button
                className={page === num ? "selected" : "notSelected"}
                onClick={() => setPage(num)}
              >
                {num}
              </button>
            </li>
          )
        )}
      </ul>

      {page != totalPages ? (
        <button className="next" onClick={() => setPage(page + 1)}>
          Next
        </button>
      ) : (
        ""
      )}
    </div>
  );
};

export default SearchPagination;
