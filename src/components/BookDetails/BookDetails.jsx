import "./bookDetails.css";
import { useParams, useNavigate } from "react-router-dom";
import { emptyCover } from "../../context";
import { useEffect, useState } from "react";
import { API_KEY } from "../../context";
import axios from "axios";

const BookDetails = () => {
  const { id } = useParams();
  const URL = `https://www.googleapis.com/books/v1/volumes/${id}?${API_KEY}`;
  const [book, setBook] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    async function getBookDetails() {
      try {
        const res = await axios.get(URL);
        setLoading(false);
        if (res) {
          const thumbnail =
            res.data.volumeInfo.imageLinks &&
            res.data.volumeInfo.imageLinks.thumbnail;
          const { authors, title, categories, description } =
            res.data.volumeInfo;
          const newBook = {
            thumbnail: thumbnail,
            authors: authors,
            title: title,
            categories: categories,
            description: description,
          };
          setBook(newBook);
        }
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    }
    getBookDetails();
  }, [id]);

  return (
    <>
        <button type="button" className="btn-back" onClick={() => navigate("/book")}>
          
        </button>
      <section className="book-details">
        <img
          className="book-details-cover"
          src={book?.thumbnail || emptyCover}
        />
        <div className="book-information">
        <div className="book-details-categories">{book?.categories}</div>
        <div className="book-details-title">{book?.title}</div>
        <div className="book-details-authors">{book?.authors}</div>
        <div className="book-details-description"> {book?.description}</div>
        </div>
      </section>
    </>
  );
};

export default BookDetails;
