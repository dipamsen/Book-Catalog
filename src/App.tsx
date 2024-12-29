import "./App.css";
import { useEffect, useReducer, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/Home";
import AddBook from "./pages/AddBook";
import ViewBooks from "./pages/ViewBooks";
import SearchBook from "./pages/SearchBook";
import Book from "./pages/Book";
import EditBook from "./pages/EditBook";
import {
  BooksActionTypes,
  BooksContext,
  BooksDispatchContext,
  booksStateReducer,
  initialState,
} from "./utils/BooksContext";
import { getFirebaseDB } from "./utils/database";
import { off, onValue, ref } from "@firebase/database";
import EditBooks from "./pages/EditBooks";

function App() {
  const [loading, setLoading] = useState(true);

  const [state, dispatch] = useReducer(booksStateReducer, initialState);

  useEffect(() => {
    const db = getFirebaseDB();
    const booksRef = ref(db, "books");
    const a = onValue(booksRef, (snapshot) => {
      const books = snapshot.val();
      dispatch({
        type: BooksActionTypes.SetBooks,
        books: Object.values(books),
      });
      setLoading(false);
    });

    const categoriesRef = ref(db, "categories");
    const b = onValue(categoriesRef, (snapshot) => {
      const categories = snapshot.val();
      dispatch({
        type: BooksActionTypes.SetCategories,
        categories: Object.values(categories),
      });
    });

    const racksRef = ref(db, "racks");
    const c = onValue(racksRef, (snapshot) => {
      const racks = snapshot.val();
      dispatch({
        type: BooksActionTypes.SetRacks,
        racks: Object.values(racks),
      });
    });

    return () => {
      off(booksRef, "value", a);
      off(categoriesRef, "value", b);
      off(racksRef, "value", c);
    };
  }, [dispatch]);

  return (
    <div className="container">
      {loading ? (
        <div className="loader-parent">
          <div className="loader"></div>
        </div>
      ) : (
        <BooksContext.Provider value={state}>
          <BooksDispatchContext.Provider value={dispatch}>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="add" element={<AddBook />} />
                <Route path="books" element={<ViewBooks />} />
                <Route path="book/:id" element={<Book />} />
                <Route path="search" element={<SearchBook />} />
                <Route path="edit" element={<EditBooks />} />
                <Route path="edit/:id" element={<EditBook />} />
              </Routes>
            </BrowserRouter>
          </BooksDispatchContext.Provider>
        </BooksContext.Provider>
      )}
    </div>
  );
}

export default App;
