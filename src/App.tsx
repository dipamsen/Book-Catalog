import "./App.css";
import { useEffect, useState } from "react";
import { books, clearBooks, loadBooks } from "./utils/catalog";
import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/Home";
import AddBook from "./pages/AddBook";
import ViewBooks from "./pages/ViewBooks";
import SearchBook from "./pages/SearchBook";
import EditBook from "./pages/EditBook";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function init() {
      if (books.length === 0) await loadBooks();
      setLoading(false);
    }
    init();

    return () => {
      clearBooks();
    };
  }, []);

  return (
    <div className="container">
      {loading ? (
        <div className="loader-parent">
          <div className="loader"></div>
        </div>
      ) : (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="add" element={<AddBook />} />
            <Route path="books" element={<ViewBooks />} />
            <Route path="search" element={<SearchBook />} />
            <Route path="edit" element={<EditBook />} />
          </Routes>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
