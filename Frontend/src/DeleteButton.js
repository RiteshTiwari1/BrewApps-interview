import React, { useState } from 'react';
import './css/Book.css';
function DeleteButton() {
    const [bookID, setBookID] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if(name === 'bookID'){
        setBookID(value);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`http://localhost:3000/books/${bookID}`, {
        method: 'DELETE', 
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        console.log('Data deleted successfully');
        
      } else {
        throw new Error(`Failed to delete data. Status code: ${response.status}`);
      }
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  

  return (
    <div className='Add-Container'>
        <input
        type="text"
        name="bookID"
        value={bookID}
        onChange={handleInputChange}
        placeholder="Book-ID"
      />
      
      <button onClick={handleSubmit}>Delete</button>
    </div>
  );
}

export default DeleteButton;
