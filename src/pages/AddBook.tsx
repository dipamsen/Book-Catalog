import { useState } from "react";
import "./AddBook.css";
import { Rack, racks } from "../utils/types";
import BookInfo from "../components/BookInfo";
import { searchBooks } from "../utils/books";
import { books_v1 } from "googleapis";
import { addBook } from "../utils/catalog";
import Header from "../components/Header";
import BarcodeScanner from "../components/BarcodeScanner";
import { Result } from "@zxing/library";

export default function AddBook() {
  const [rack, setRack] = useState<Rack | "">("");
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<books_v1.Schema$Volume[]>([]);
  const [showScanner, setShowScanner] = useState(false);
  const [searching, setSearching] = useState(false);

  function scanBarcode() {
    setShowScanner((prev) => {
      if (!prev) {
        setResults([]);
        setSearch("");
      }
      return !prev;
    });
  }

  function handleSearch(search: string) {
    if (!search) return;
    setSearching(true);
    searchBooks(search).then((data) => {
      if (data.items) setResults(data.items);
      setSearching(false);
    });
  }

  function handleScan(_err: unknown, result: Result | undefined) {
    if (result) {
      setShowScanner(false);
      const newSearch = "isbn:" + result.getText();
      setSearch(newSearch);
      handleSearch(newSearch);
    }
  }

  return (
    <div className="add-book">
      <Header />
      <h2>Add Book</h2>
      <div className="add-book-form">
        <select
          className="rack-select"
          value={rack}
          onChange={(e) => setRack(e.target.value as Rack)}
        >
          <option value="">Select a rack</option>
          {racks.map((r) => (
            <option key={r} value={r}>
              Rack {r}
            </option>
          ))}
        </select>
        <div className="search-scan">
          <form
            className="search-form"
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch(search);
            }}
          >
            <input
              className="search-box"
              type="search"
              placeholder="Search for books"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </form>
          <button className="scan-button" onClick={() => scanBarcode()}>
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
      </div>

      {showScanner && (
        <div className="barcode-scanner-parent">
          <BarcodeScanner handleScan={handleScan} />
        </div>
      )}

      {!showScanner && results.length === 0 && (
        <div className="no-results">{searching && "Searching..."}</div>
      )}

      <div className="search-results">
        {results.map((book) => (
          <div className="search-result" key={book.id}>
            <BookInfo book={book} />
            <div className="actions">
              {rack && (
                <button
                  onClick={() => {
                    addBook(book.id!, rack).then(() => {
                      setResults([]);
                      setSearch("");
                    });
                  }}
                  className="add-button"
                >
                  Add to {rack}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
