import React, { useEffect } from "react";
import { useState } from "react";
import * as BooksAPI from "../utils/BooksAPI";
import { Link } from "react-router-dom";

export default function SearchPage() {
  const [result, setResult] = useState([]);
  const[allBooks,setAllBooks]=useState([]);
  const clearQuery = () => {
    updateQuery("");

  };
  useEffect(()=>{
    getAllBooks()
  },[])

  const getAllBooks = () => {
    const getAll = async () => {
      const res = await BooksAPI.getAll();
      setAllBooks(res);
    };

    getAll();
  
    

  };

  const updateQuery = (query) => {
    if (query.length === 0) {
      setResult([])
    } else {
      showingBooks(query);
    }
  };
  const defaultSelectHandler = (book)=>{
   
    for (let i = 0; i < allBooks.length; i++) {

      if(book.id===allBooks[i].id){
        return(allBooks[i].shelf)
      }

      

    }
    return("move")
    
  }

  const showingBooks = (queryy) => {
    const getSearch = async () => {
      const res = await BooksAPI.search(queryy.trim(), 100);
      if (res) {
        if (res.error !== "empty query") {

          setResult(res);
        } else {
          setResult([]);
        }
      }
    };

    getSearch();
  };

  const selectHandler = (value, id) => {
    const change = async () => {
      await BooksAPI.update(id, value);
    };
    change();
  };
  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to="/">
          Close
        </Link>
        <div className="search-books-input-wrapper">
          <input
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
              if (result.length > 0) {

                if (book.imageLinks) {
                  return (
                    <li key={book.id}>
                      <div className="book">
                        <div className="book-top">
                          <div
                            className="book-cover"
                            style={{
                              width: 128,
                              height: 193,
                              backgroundImage: `url(${book.imageLinks.thumbnail})`,
                            }}
                          ></div>
                          <div className="book-shelf-changer">
                            <select
                              onChange={(e) => {
                                selectHandler(e.target.value, book);
                              }}
                              defaultValue={
                                defaultSelectHandler(book)
                              }
                            >
                              <option value="move" disabled>
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
                } else {
                  return (
                    <li key={book.id}>
                      <div className="book">
                        <div className="book-top">
                          <div
                            className="book-cover"
                            style={{
                              width: 128,
                              height: 193,
                            }}
                          ></div>
                          <div className="book-shelf-changer">
                            <select
                              onChange={(e) => {
                                selectHandler(e.target.value, book);
                              }}
                              defaultValue={
                                defaultSelectHandler(book)
                              }
                            >
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
                }
              } else {
                return <h1>SLOO</h1>;
              }
            })}
          </ol>
        </div>
      </div>
    </div>
  );
}
