import { emptyCover } from "../../context";
import { Link } from "react-router-dom";
import "./book.css";

const Book = (book) => {
  let thumbnail =
    book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail;
  let authors = book.volumeInfo.authors;
  let title = book.volumeInfo.title;
  let categories = book.volumeInfo.categories;
  return (
    <>
      <div className="book-card">
        <Link to={`/book/${book.id}`} className="book-card-link">
          <img
            className="book-cover-img"
            src={thumbnail ? thumbnail : emptyCover}
          />
          <div className="book-content">
            <div className="book-сategory">
              {categories ? `Категория: ${categories[0]}` : null}
            </div>
            <h3 className="book-title">
              {title.length < 30 ? title : `${title.slice(0, 30)}...`}
            </h3>
            <div className="book-authors">{authors}</div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default Book;
