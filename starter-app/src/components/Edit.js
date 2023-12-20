import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function Edit(props) {
    let { id } = useParams();

    const [title, setTitle] = useState("");
    const [url, setURL] = useState("");
    const [authors, setAuthors] = useState([""]);

    const nav = useNavigate();

    //Get the current values of the current book
    useEffect(() => {
        axios.get('http://localhost:4000/api/books/searchID/'+id)
        .then((response) => {
            response.data.forEach(book => {
                console.log(book);
                setTitle(book.title);
                setURL(book.thumbnailUrl);
                setAuthors(book.authors);
            });

        }).catch(function (error) {
            console.log(error);
        })
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        const newBook = {
            id: id,
            title: title,
            thumbnailUrl: url,
            authors: authors
        };

        //Uploads the book to the server in place of the ID being updated.
        axios.put('http://localhost:4000/api/books/'+id, newBook)
        .then((res) => {
            console.log(res.data);
            nav('/read');
        });
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Change Book Title: </label><br/>
                    <input type="text" classname="form-control" value={title}
                    onChange={(e) => setTitle(e.target.value)}/>
                </div><br/>
                <div className="form-group">
                    <label>Change Book Cover URL: </label><br/>
                    <input type="text" classname="form-control" value={url}
                    onChange={(e) => setURL(e.target.value)}/>
                </div><br/>
                <div className="form-group">
                    <label>Change Author: </label><br/>
                    <input type="text" classname="form-control" value={authors}
                    onChange={(e) => setAuthors(e.target.value)}/>
                </div><br/>
                <div className="form-group">
                    <input type="submit" value="Edit Book" className="btn btn-primary"/>
                </div>
            </form>
        </div>
    );
}
