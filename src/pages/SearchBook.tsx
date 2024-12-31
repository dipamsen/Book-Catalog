import { useEffect, useState, useCallback } from "react";
import Header from "../components/Header";
import "./SearchBook.css";
import BarcodeScanner from "../components/BarcodeScanner";
import { Result } from "@zxing/library";
import BookTile from "../components/BookTile";
import { useBooksState } from "../utils/BooksContext";
import { searchFilter } from "../utils/search";

export default function SearchBook() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<string[]>([]);
  const [showScanner, setShowScanner] = useState(false);

  const { books } = useBooksState();

  const handleSearch = useCallback(
    (search: string) => {
      if (!search) setResults([]);
      else setResults(searchFilter(books, search).map((book) => book.id));
    },
    [books]
  );

  function clearSearch() {
    setSearch("");
    setResults([]);
  }

  function scanBarcode() {
    setShowScanner((prev) => {
      if (!prev) {
        clearSearch();
      }
      return !prev;
    });
  }

  function handleScan(_err: unknown, result: Result | undefined) {
    if (result) {
      const isbn = result.getText();
      setShowScanner(false);
      setSearch(isbn);
      handleSearch(isbn);
    }
  }

  useEffect(() => {
    // debounce search

    const timeout = setTimeout(() => {
      handleSearch(search);
    }, 500);

    return () => clearTimeout(timeout);
  }, [search, handleSearch]);

  return (
    <div className="search-book">
      <Header backLink="/" />

      <h2>Search Book</h2>

      <div className="form">
        <input
          type="search"
          placeholder="Search for books"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          type="button"
          title="Scan Barcode"
          className="scan-button"
          onClick={() => scanBarcode()}
        >
          <span
            className={[
              "material-symbols-outlined",
              "icon",
              showScanner && "active",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            barcode_scanner
          </span>
        </button>
      </div>

      {showScanner && <BarcodeScanner handleScan={handleScan} />}

      <div className="results">
        {results.map((book) => (
          <BookTile
            key={book}
            book={books.find((b) => b.id === book)!}
            showRack
            horizontal
          />
        ))}
      </div>
    </div>
  );
}
