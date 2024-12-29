import { useState } from "react";
import Header from "../components/Header";
import { BookInfo } from "../utils/types";
import "./SearchBook.css";
import BarcodeScanner from "../components/BarcodeScanner";
import { Result } from "@zxing/library";
import BookTile from "../components/BookTile";
import { useBooksState } from "../utils/BooksContext";
import { searchFilter } from "../utils/search";

export default function SearchBook() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<BookInfo[]>([]);
  const [showScanner, setShowScanner] = useState(false);

  const { books } = useBooksState();

  function handleSearch(search: string) {
    if (!search) return;

    setResults(searchFilter(books, search));
  }

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

  return (
    <div className="search-book">
      <Header backLink="/" />

      <h2>Search Book</h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch(search);
        }}
      >
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
      </form>

      {showScanner && <BarcodeScanner handleScan={handleScan} />}

      <div className="results">
        {results.map((book) => (
          <BookTile key={book.id} book={book} showRack horizontal />
        ))}
      </div>
    </div>
  );
}
