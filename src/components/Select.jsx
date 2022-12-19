import React, { useEffect, useState } from "react";
import * as BooksAPI from "../utils/BooksAPI";
export default function Select({ bookId }) {
  const [checkk,setCheck]=useState('')
  useEffect(()=>{console.log(bookId)},[])


  const onSelectShelfHandler = (event) => {
    const updateShelf = async () => {
      const res = await BooksAPI.update(bookId, event.target.value);
    };

    updateShelf();
    check();
  };

  const check=()=>{
    const checkShelf = async () => {
      const res = await BooksAPI.get(bookId);
      setCheck(res.shelf)
    };
    checkShelf();
    console.log(checkk)

  }

  
  return (
    <div className="book-shelf-changer">
      <select onChange={onSelectShelfHandler}>
        <option value="none" disabled>
          Move to...
        </option>
        <option value="currentlyReading">Currently Reading</option>
        <option value="wantToRead">Want to Read</option>
        <option value="read">Read</option>
        <option value="none">None</option>
      </select>
    </div>
  );
}
