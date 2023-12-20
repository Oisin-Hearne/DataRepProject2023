import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Create() {

  //These allow us to modify the valeus of title, author and cover in the input boxes on the fly
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [cover, setCover] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); //Prevents data from being submitted multiple times

    //Post book to server

    const book = {
      title:title,
      authors:[author],
      thumbnailURL:cover
    }
    postBook(book);
  };

  function postBook(book) {
    axios.post("http://localhost:4000/api/books", book).then(
      (response) => {
        console.log(response);
      }
    ).catch(
      (error) => {
        console.log(error);
      }
    );
  }

  //onChange below lets the valeus of title, author and cover be updated every time the user changes the field.
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group" style={{ margin: "auto", width: "50%", textAlign: "center", padding: "10px" }}><h2><i>Fill Out Book Details</i></h2>
        <br />Add Book Title<br />
        <input type="text" className="form-control" value={title} onChange={(e) => { setTitle(e.target.value) }} /><br />
        <br />Add Book Author<br />
        <input type="text" className="form-control" value={author} onChange={(e) => { setAuthor(e.target.value) }} /><br />
        <br />Add Cover URL<br />
        <input type="text" className="form-control" value={cover} onChange={(e) => { setCover(e.target.value) }} /><br />
        <br /><input type="submit" className="form-control" value="Add Book"/>
      </div>
    </form>
  );

}






export default Create;