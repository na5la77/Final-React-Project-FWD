import React, { Fragment, useEffect, useState } from 'react'
import Shelf from './Shelf'
import * as BooksAPI from '../utils/BooksAPI'

export default function HomePage() {
  const [result,setResult] = useState([])
  useEffect(()=>{
    showingBooks();
  },[])
  const showingBooks = () => {
    const getAll = async () => {
      const res = await BooksAPI.getAll();
      setResult(res);
    };

    getAll();
  };
  return (
    <div className="list-books">
    <div className="list-books-title">
      <h1>MyReads</h1>
    </div>
    <div className="list-books-content">
    
    <Shelf shelfName="Currently Reading"/>
    <Shelf shelfName="Want To Read"/>
    <Shelf shelfName="Read"/>
    </div>
    </div>
   
  )
}
