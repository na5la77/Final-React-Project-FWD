import "./css/App.css";
import { Route, Routes } from "react-router";
import HomePage from "./components/HomePage";
import SearchPage from "./components/SearchPage";
import * as BooksAPI from "./utils/BooksAPI";
import { useEffect, useState } from "react";

function App() {
  const [books, setBooks] = useState([]);
  const [searchBooks, setSearchBooks] = useState([]);

  useEffect(() => {
    const getBooks = async () => {
      const res = await BooksAPI.getAll();
      setBooks(res);
    };

    getBooks();
  }, []);

  return (
    <Routes>
      <Route exact path="/" element={<HomePage books={books}/>} />

      <Route exact path="/search" element={<SearchPage />} />
    </Routes>
  );
}

export default App;
