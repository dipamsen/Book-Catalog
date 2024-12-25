import AddBook from "./pages/AddBook";
import "./App.css";
import { useEffect, useState } from "react";
import { books, clearBooks, loadBooks } from "./utils/catalog";
import { BrowserRouter, Routes, Route } from "react-router";
import ViewBooks from "./pages/ViewBooks";
import Home from "./pages/Home";

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
        <>
          <h1>Books Catalog</h1>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="add" element={<AddBook />} />
              <Route path="view" element={<ViewBooks />} />
            </Routes>
          </BrowserRouter>
        </>
      )}
    </div>
  );
}

export default App;
