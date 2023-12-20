import React from 'react';
import Books from './Books';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Read() {

  const [bookData, setData] = useState([]);

  //Retrieves data from our server and sets the value of bookData to the books array returned
  useEffect(
    () => {
      axios.get("http://localhost:4000/api/books").then(
        (response)=>{
          setData(response.data);
        }
      ).catch(
        (error)=>{
          console.log(error);
        }
      );
    },[]
  );

  //Reloads the data. A method to be called by BookItem whenever
  //the delete button is pressed.
  const ReloadData = (e) => {
    axios.get("http://localhost:4000/api/books").then(
      (response)=>{
        setData(response.data);
      }
    ).catch(
      (error)=>{
        console.log(error);
      }
    );
  }
  

    //Read calls Books, Books calls BookItem.
  return (
    <div>
      <h2>Read Component</h2>
      <Books myBooks={bookData} Reload={ReloadData}></Books>
    </div>
  );

}


export default Read;