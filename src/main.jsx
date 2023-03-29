import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Header from "./components/Header/Header";
import Book from "./components/Book/Book";
import BookList from "./components/BookList/BookList";
import BookDetails from "./components/BookDetails/BookDetails";
import { AppProvider } from "./context";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AppProvider>
    <BrowserRouter>
      <Routes>
        <Route  path="/" element={<Home />}>
          <Route key="book" path="/book" element={ <BookList/> } />
          <Route key="bookDetails" path="/book/:id" element={<BookDetails />} />
       </Route>
      </Routes>
    </BrowserRouter>
  </AppProvider>
);
