import "./bookList.css";
import { useEffect, useState } from "react";
import { useGlobalContext } from "../../context";
import Book from "../Book/Book";

const BookList = () => {
  const { books, resultTitle, isEmpty, isLoading, setLoading, totalCount, pageNumber, setPageNumber} =
    useGlobalContext();

  const [showButton, setShowButton] = useState(false);

  // Up arrow
  const scrollButtonHandler =()=>{
    if (window.pageYOffset > 3 * window.innerHeight) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  }
  useEffect(() => {
    document.addEventListener("scroll", scrollButtonHandler, scrollHandler);
    return function () {
      document.removeEventListener("scroll", scrollButtonHandler, scrollHandler);
    };
  }, []);
  
  function handleClick() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
// scroll load

const scrollHandler = (e) => {
  setTimeout(() => {
    setLoading(false)
  }, 200);
  if (
  !isLoading &&
    e.target.documentElement.scrollHeight -
      (e.target.documentElement.scrollTop + window.innerHeight) <
      20 && books.length <= totalCount
  ) {
    setPageNumber(pageNumber + 1)
  }
};


  useEffect(() => {
    document.addEventListener("scroll", scrollHandler);
    return function () {
      document.removeEventListener("scroll", scrollHandler);
    };
  }, [scrollHandler]);

  

  return (
    <>
      <div>
        <div className={`total-book-count ${isEmpty ? "red-count" : ""}`}>
          {resultTitle}
        </div>

        <div className="container">
          {books.map((book, index) => {
            return <Book key={index} {...book} />;
          })}
        {showButton && (
        <button className="btn-up" type="button" onClick={handleClick}>
        </button>
      )}
        </div>
      </div>
    </>
  );
};

export default BookList;
