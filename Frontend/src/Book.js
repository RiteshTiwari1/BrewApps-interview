import React, { useState, useEffect } from 'react';
import AddButtons from './AddButtons';
import UpdateButton from './UpdateButton';
import DeleteButton from './DeleteButton';
import ShowButton from './ShowButton';
import GetButton from './GetButton';

import './css/Book.css'

function Book() {
  const [bookData, setBookData] = useState([]);
  const [activeButton, setActiveButton] = useState(null); 

 

  useEffect(() => {
    if (activeButton === 'Show') {
      fetch('http://localhost:3000/books')
        .then(response => response.json())
        .then(data => {
          setBookData(data);
          // console.log(data);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }
  }, [activeButton]); 


  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  }

  useEffect(() => {
    
    fetch('http://localhost:3000/books')
      .then(response => response.json())
      .then(data => {
        setBookData(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <>
      
      <div className="button-container">
        <button 
          className={activeButton ==='Add' ? 'active' : ''}
          onClick={()=>handleButtonClick('Add')}
        >
          Add
        </button>
        <button
          className={activeButton === 'Show' ? 'active' : ''}
          onClick={() => handleButtonClick('Show')}
        >
          Show
        </button>
        <button
          className={activeButton === 'Update' ? 'active' : ''}
          onClick={() => handleButtonClick('Update')}
        >
          Update
        </button>
        <button
          className={activeButton === 'Delete' ? 'active' : ''}
          onClick={() => handleButtonClick('Delete')}
        >
          Delete
        </button>
        <button 
          className={activeButton ==='Get' ? 'active' : ''}
          onClick={()=>handleButtonClick('Get')}
        >
          Get
        </button>
      </div>
      
      <div className='Extra'>
      {activeButton==='Add' && <AddButtons/>}
      {activeButton==='Update' && <UpdateButton/>}
      {activeButton==='Delete' && <DeleteButton/>}
      {activeButton === 'Show' && <ShowButton bookData={bookData} />}
      {activeButton === 'Get' && <GetButton />}
      </div>
    </>
  );
}

export default Book;
