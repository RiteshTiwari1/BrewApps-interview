import React, { useState } from 'react';
import './css/Book.css';

function GetButton() {
  const [bookID, setBookID] = useState('');
  const [bookData, setBookData] = useState(null); 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'bookID') {
      setBookID(value);
    }
  };

  const handleSubmit = async () => {
    try {
      if (!bookID) {
        console.error('Please enter a valid Book ID');
        return;
      }

      const response = await fetch(`http://localhost:3000/books/${bookID}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setBookData(data);
      } else {
        throw new Error(`Failed to fetch data. Status code: ${response.status}`);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="Add-Container">
      <input
        type="text"
        name="bookID"
        value={bookID}
        onChange={handleInputChange}
        placeholder="Book-ID"
      />

      <button onClick={handleSubmit}>Get</button>

      {bookData && (
        <div className="book-data">
          <p>Book ID: {bookData.book_id}</p>
          <p>Title: {bookData.title}</p>
          <p>Author: {bookData.author}</p>
          <p>Summary: {bookData.summary}</p>
        </div>
      )}
    </div>
  );
}

export default GetButton;
