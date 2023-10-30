import React from 'react';
import './css/ShowButton.css';
function ShowButton({ bookData }) {
  return (
    <div className="book-list">
      {bookData.map((book) => (
        <div key={book.bookId} className="book-box">
          <div className="book-property">Book ID: {book.book_id}</div>
          <div className="book-property">Title: {book.title}</div>
          <div className="book-property">Author: {book.author}</div>
          <div className="book-property">Summary: {book.summary}</div>
        </div>
      ))}
    </div>
  );
}

export default ShowButton;
