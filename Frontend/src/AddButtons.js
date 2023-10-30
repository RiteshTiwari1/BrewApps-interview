import React, { useState } from 'react';
import './css/Book.css';
function AddButtons() {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [author, setAuthor] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'title') {
      setTitle(value);
    } else if (name === 'summary') {
      setSummary(value);
    } else if (name === 'author') {
      setAuthor(value);
    }
  };

  const handleSubmit = async () => {
    const dataToSend = {
      title: title, 
      author: author, 
      summary: summary, 
    };
  
    try {
      const response = await fetch('http://localhost:3000/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Data sent successfully:', data);

      } else {
        throw new Error(`Failed to send data. Status code: ${response.status}`);
      }
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };
  

  return (
    <div className='Add-Container'>
      <input
        type="text"
        name="title"
        value={title}
        onChange={handleInputChange}
        placeholder="Title"
      />
      <input
      type="text"
      name="author"
      value={author}
      onChange={handleInputChange}
      placeholder="Author"
      />  
      <input
        type="text"
        name="summary"
        value={summary}
        onChange={handleInputChange}
        placeholder="Summary"
      />
      
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default AddButtons;
