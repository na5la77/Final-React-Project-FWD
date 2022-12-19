import React, { useEffect, useState } from "react";
import * as BooksAPI from "../utils/BooksAPI";

export default function Shelf({ shelfName }) {
  const [result, setResult] = useState([]);
  const [changeShelf, setChangeShelf] = useState(false);

  useEffect(() => {
    showingBooks();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[changeShelf]);


  const showingBooks = () => {
    const getAll = async () => {
      const res = await BooksAPI.getAll();
      setResult(res);
      setChangeShelf(!changeShelf);
    };

    getAll();
  };
  const selectHandler = (value, id) => {
    const change = async () => {
       await BooksAPI.update(id, value);
    };
    change();
  };
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{shelfName}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {result
            .filter(
              (book) =>
                book.shelf.toLowerCase() ===
                shelfName.toLowerCase().replace(/\s/g, "")
            )
            .map((book) => {
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
                          defaultValue={book.shelf}
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
            })}
        </ol>
      </div>
    </div>
  );
}
