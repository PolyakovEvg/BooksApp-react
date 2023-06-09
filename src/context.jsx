import React, {
  useState,
  useContext,
  useEffect,
  useCallback,
  createContext,
} from "react";

import axios from "axios";

export const API_KEY = "AIzaSyCJSCfn0V87IqJx6SNbatoFwRZQmIugAvQ";
export const emptyCover = "/src/assets/imgs/book-not-available.jpg";

const AppContext = createContext();
const AppProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("react");
  const [books, setBooks] = useState([]);
  const [resultTitle, setResultTitle] = useState("");
  const [isLoading, setLoading] = useState(true);
  const [isEmpty, setEmpty] = useState(false);
  const [currentMaxResults, setMaxResults] = useState(30);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [sortValue, setSortValue] = useState("relevance");
  const [filterValue, setFilterValue] = useState("all");
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [relevanceBooks, setRelevanceBooks] = useState([]);

  const fetchBooks = useCallback(async () => {
    setLoading(true);
    try {
      console.log("fetch starting");
      const res = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}${
          filterValue !== "all" ? `+subject:${filterValue}` : ""
        }&orderBy=${sortValue}&key=${API_KEY}&maxResults=${currentMaxResults}&startIndex=${
          (pageNumber - 1) * 30
        }`
      );
      if (res.data.totalItems > 1) {
        setResultTitle(`По вашему запросу найдено: ${res.data.totalItems}`);
        setTotalCount((prevCount) => prevCount + res.data.totalItems);
        setBooks([...books, ...res.data.items]);
      } else {
        setResultTitle(`По вашему запросу ничего не найдено`);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }, [searchTerm, pageNumber, setSortValue, setFilterValue, filterValue]);


  // Filter handler
  // const handleFilterChange = (e) => {
  //   setBooks([]);
  //   setFilterValue(e.target.value);
  // };

  // Use effect

  useEffect(() => {
    fetchBooks();
    setFilteredCategories([
      "all",
      "art",
      "biography",
      "computers",
      "history",
      "medical",
      "poetry",
    ]);
  }, [searchTerm, pageNumber, filterValue]);

  return (
    <AppContext.Provider
      value={{
        books,
        setBooks,
        setSearchTerm,
        searchTerm,
        resultTitle,
        setResultTitle,
        setEmpty,
        isEmpty,
        isLoading,
        setLoading,
        setPageNumber,
        pageNumber,
        setTotalCount,
        totalCount,
        sortValue,
        filterValue,
        filteredCategories,
        setSortValue,
        relevanceBooks,
        setRelevanceBooks,
        setFilterValue
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
