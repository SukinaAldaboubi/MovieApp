import React, { useEffect, useState } from "react";

const SearchPagination = ({ page, setPage, totalPages }) => {
  const [pageNum, setpageNum] = useState([]);

  useEffect(() => {
    setUpPages();
  }, []);

  const setUpPages = () => {
    let pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    setpageNum(pages);
  };

  const previous = () => {};

  const next = () => {};

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
        {pageNum.map((num) => (
          <li key={num}>
            {num === 8 ? (
              "..."
            ) : num < 8 ? (
              ""
            ) : (
              <button
                className={page === num ? "selected" : "notSelected"}
                onClick={() => setPage(num)}
              >
                {num}
              </button>
            )}

            {num === totalPages || num === totalPages - 1 ? (
              <button
                className={page === num ? "selected" : "notSelected"}
                onClick={() => setPage(num)}
              >
                {num}
              </button>
            ) : (
              ""
            )}
          </li>
        ))}
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
