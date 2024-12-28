import { useEffect, useState } from "react";
import "./AddBook.css";
import { Rack, racks } from "../utils/types";
import BookInfo from "../components/BookInfo";
import { searchBooks } from "../utils/books";
import { books_v1 } from "googleapis";
import { addGoogleBook, addCustomBook } from "../utils/catalog";
import Header from "../components/Header";
import BarcodeScanner from "../components/BarcodeScanner";
import { Result } from "@zxing/library";
import { categories } from "../utils/types";

export default function AddBook() {
  const [rack, setRack] = useState<Rack | "">("");
  const [category, setCategory] = useState<(typeof categories)[number] | "">(
    ""
  );
  const [search, setSearch] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<books_v1.Schema$Volume[]>([]);
  const [showScanner, setShowScanner] = useState(false);
  const [searching, setSearching] = useState(false);
  const [showCustomBookCreation, setShowCustomBookCreation] = useState(false);
  const [customBookTitle, setCustomBookTitle] = useState("");
  const [customBookISBN, setCustomBookISBN] = useState("");

  function clearSearch() {
    setResults([]);
    setSearch("");
    setSearchTerm("");
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
    setResults([]);
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
    }
  }

  function createCustomBook() {
    const searchedByISBN =
      searchTerm.slice(0, 5).toLowerCase() === "isbn:"
        ? searchTerm.slice(5)
        : searchTerm.split("").every((c) => "0123456789".includes(c))
        ? searchTerm
        : "";
    const title = searchedByISBN ? "" : searchTerm;
    const isbn = searchedByISBN;
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
      <Header backLink="/" />
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
        <select
          className="category-select"
          value={category}
          onChange={(e) =>
            setCategory(e.target.value as (typeof categories)[number])
          }
        >
          <option value="">Select a category</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
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
          <button
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
      </div>

      {showScanner && (
        <div className="barcode-scanner-parent">
          <BarcodeScanner handleScan={handleScan} />
        </div>
      )}

      {!showScanner && results.length === 0 && (
        <div className="no-results">{searching && "Searching..."}</div>
      )}

      {showCustomBookCreation && rack && category && (
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
              if (customBookTitle) {
                addCustomBook(
                  customBookTitle,
                  rack,
                  category,
                  customBookISBN
                ).then(() => {
                  setCustomBookTitle("");
                  setCustomBookISBN("");
                  setShowCustomBookCreation(false);
                  clearSearch();
                });
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
              {rack && category && (
                <button
                  onClick={() => {
                    addGoogleBook(book.id!, rack, category).then(() => {
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
