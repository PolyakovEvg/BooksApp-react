import "./SearchForm.css";
import SortForm from "./SortForm";
import FilterForm from "./FilterForm";
import {  useRef } from "react";
import {  Link, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../context";

const SearchForm = () => {
  const {
    setSearchTerm,
    setResultTitle,
    setEmpty,
    setBooks,
    books,
    searchTerm,
    setTotalCount,
    setPageNumber, 
    
  } = useGlobalContext();
  
  const searchText = useRef("");
  const navigate = useNavigate("");

  const blickFunction = () => {
    setEmpty(true);
    setTimeout(() => {
      setEmpty(false);
    }, 150);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    let searchQuery = searchText.current.value.trim();
    if (searchQuery.length === 0) {
      setResultTitle("Введите книгу для поиска");
      blickFunction();
      setTotalCount(0)
    } else if(searchQuery !== searchTerm) {

      setBooks([]);
      setTotalCount(0)
      setPageNumber(1)
      setSearchTerm(searchQuery);
      setEmpty(false);
    } else{
      setBooks(books)
    }
    navigate("/book");
  };

  return (
    <>
      <div className="search-wrap">
        <div className="search-title">
        <Link to="/" className="search-link">
          <h1> Search for book </h1>
          </Link>
        </div>
          <div className="search-string">
        <div className="search-form" onSubmit={handleSubmit}>
            <input
              type="text"
              className="search-input"
              placeholder={
                searchText.current.value
                  ? searchText.current.value
                  : "Enter your book name"
              }
              ref={searchText}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  {
                    handleSubmit(e);
                  }
                }
              }}
            />
            <button className="search-btn" onClick={handleSubmit}></button>
            </div>
          <div className='search-options'>
          <SortForm/>
          <FilterForm/>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchForm;
