import React from "react";
import { useState, useEffect } from "react";
import * as BooksAPI from "../utils/BooksAPI";
import { Link } from "react-router-dom";



export default function SearchPage({ search }) {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState([]);
  const [response,setResponse]=useState('')
  const clearQuery = () => {
    updateQuery("");
  };

  const updateQuery = (query) => {
    if (query.length === 0) {
      setQuery("".trim());
      setResult([]);
    } else {
      setQuery(query.trim());
      showingBooks(query);
    }
  };

  const showingBooks = (queryy) => {
    const getSearch = async () => {
      const res = await BooksAPI.search(queryy);
      setResult(res);
    };

    getSearch();
  };


  const selectHandler=(value,id)=>{
      const change = async ()=>{
        const res = await BooksAPI.update(id,value)
        setResponse(res)
      }
      change();
      console.log(response)
  }

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to="/">Close</Link>
        <div className="search-books-input-wrapper">
          <input
            value={query}
            onChange={(event) => {
              updateQuery(event.target.value);
            }}
            onEmptied={clearQuery}
            className="search-contacts"
            type="text"
            placeholder="Search by title, author, or ISBN"
          />
        </div>
      </div>
      <div className="search-books-results">
        <div className="bookshelf-books">
          <ol className="books-grid">
            {result.map((book) => {
              return (
                <li key={book.id}>
                  <div className="book">
                    <div className="book-top">
                      <div
                        className="book-cover"
                        style={{
                          width: 128,
                          height: 193,
                          backgroundImage:
                            `url(${book.imageLinks.thumbnail})`,
                        }}
                      ></div>
                      <div className="book-shelf-changer">
                      
                            <select onChange={(e)=>{selectHandler(e.target.value,book)}}>
                              <option value="none" disabled>
                                Move to...
                              </option>
                              <option value="currentlyReading">
                                Currently Reading
                              </option>
                              <option value="wantToRead">Want to Read</option>
                              <option value="read">Read</option>
                              <option value="none">None</option>
                            </select>
                          </div>
              
                    </div>
                    <div className="book-title">{book.title}</div>
                    <div className="book-authors">{book.authors}</div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
      
    </div>
    // <div>
    // {hamada.map((book)=>{
    //     return(
    //         <h2>{book.title}</h2>
    //     )
    // })}
    // </div>
  );
}
