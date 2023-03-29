import "./SortForm";
import { useGlobalContext } from "../../context";

const SortForm = () => {
  const {
    sortValue,
    setSortValue,
    books,
    setBooks,
    relevanceBooks,
    setRelevanceBooks,
  } = useGlobalContext();

  const handleSortChange = (e) => {
    const selectedValue = e.currentTarget.value;

    setRelevanceBooks((prevState) => [...books]);

    if (selectedValue === "newest") {
      const sortedBooks = [...books].sort((bookA, bookB) => {
        const publishedDateA = bookA.volumeInfo.publishedDate
          ? new Date(bookA.volumeInfo.publishedDate)
          : new Date(0);
        const publishedDateB = bookB.volumeInfo.publishedDate
          ? new Date(bookB.volumeInfo.publishedDate)
          : new Date(0);
        return publishedDateB - publishedDateA;
      });
      setBooks(sortedBooks);
    } else {
      setBooks(relevanceBooks);
    }

    setSortValue(selectedValue);
  };

  return (
    <>
      <div className="sort-form select">
        <label className="select-label"> Sort by </label>
        <select
          className="form-control"
          value={sortValue}
          onChange={handleSortChange}
          multiple={false}
        >
          <option value="relevance">Relevance</option>
          <option value="newest">Newest</option>
        </select>
      </div>
    </>
  );
};

export default SortForm;
