import "./css/App.css";
import { Route, Routes,useNavigate } from "react-router";
import HomePage from "./components/HomePage";
import SearchPage from "./components/SearchPage";
import * as BooksAPI from "./utils/BooksAPI";
import { useEffect, useState } from "react";

function App() {
  const [books, setBooks] = useState([]);
  let navigate = useNavigate();


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

      <Route exact path="/search" element={<SearchPage navigate={navigate}/>} />
    </Routes>
  );
}

export default App;
