import { useEffect, useState } from "react";
import "./AddBook.css";
import { Rack, racks } from "../utils/types";
import BookInfo from "../components/BookInfo";
import { searchBooks } from "../utils/books";
import { books_v1 } from "googleapis";
import { addBook, addCustomBook } from "../utils/catalog";
import Header from "../components/Header";
import BarcodeScanner from "../components/BarcodeScanner";
import { Result } from "@zxing/library";

export default function AddBook() {
  const [rack, setRack] = useState<Rack | "">("");
  const [search, setSearch] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<books_v1.Schema$Volume[]>([]);
  const [showScanner, setShowScanner] = useState(false);
  const [searching, setSearching] = useState(false);
  const [scannedISBN, setScannedISBN] = useState("");
  const [showCustomBookCreation, setShowCustomBookCreation] = useState(false);
  const [customBookTitle, setCustomBookTitle] = useState("");
  const [customBookISBN, setCustomBookISBN] = useState("");

  function clearSearch() {
    setResults([]);
    setSearch("");
    setSearchTerm("");
    setScannedISBN("");
    setCustomBookTitle("");
    setCustomBookISBN("");
    setShowCustomBookCreation(false);
  }

  function scanBarcode() {
    setShowScanner((prev) => {
      if (!prev) {
        clearSearch();
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
      setSearch("isbn:" + result.getText());
      setSearchTerm("isbn:" + result.getText());
      setScannedISBN(result.getText());
    }
  }

  function createCustomBook() {
    const searchedByISBN = searchTerm.slice(0, 5).toLowerCase() === "isbn:";
    const title = searchedByISBN ? "" : searchTerm;
    const isbn = scannedISBN || searchedByISBN ? searchTerm.slice(5) : "";
    clearSearch();
    setShowCustomBookCreation(true);
    setCustomBookTitle(title);
    setCustomBookISBN(isbn);
  }

  useEffect(() => {
    if (searchTerm) {
      handleSearch(searchTerm);
    }
  }, [searchTerm]);

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
              setSearchTerm(search);
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

      {showCustomBookCreation && rack && (
        <div className="custom-book-form">
          <h3>Add Custom Book</h3>
          <div className="inputs">
            <input
              type="text"
              placeholder="Title"
              value={customBookTitle}
              onChange={(e) => setCustomBookTitle(e.target.value)}
            />
            <input
              type="text"
              placeholder="ISBN"
              value={customBookISBN}
              onChange={(e) => setCustomBookISBN(e.target.value)}
            />
          </div>
          <button
            onClick={() => {
              if (customBookTitle && customBookISBN) {
                addCustomBook(customBookISBN, customBookTitle, rack).then(
                  () => {
                    setCustomBookTitle("");
                    setCustomBookISBN("");
                    setShowCustomBookCreation(false);
                    clearSearch();
                  }
                );
              }
            }}
          >
            Add to {rack}
          </button>
        </div>
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
                      clearSearch();
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
        {searchTerm && !searching && (
          <div className="search-result" key="custom">
            <BookInfo
              book={{
                id: "custom",
                volumeInfo: {
                  title: "Unknown Book",
                  authors: ["Unknown Author"],
                },
              }}
            />
            <div className="actions">
              {rack && (
                <button
                  onClick={() => {
                    createCustomBook();
                  }}
                  className="add-button"
                >
                  Add to {rack}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
