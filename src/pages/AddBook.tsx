import { useEffect, useState } from "react";
import "./AddBook.css";
import BookInfo from "../components/BookInfo";
import { searchBooks } from "../utils/books";
import { books_v1 } from "googleapis";
import Header from "../components/Header";
import BarcodeScanner from "../components/BarcodeScanner";
import { Result } from "@zxing/library";
import {
  BooksActionTypes,
  useBooksState,
  useBooksStateDispatch,
} from "../utils/BooksContext";
import { BookInfo as Book } from "../utils/types";
import { nanoid } from "nanoid";
import * as database from "../utils/catalog";

export default function AddBook() {
  const [rack, setRack] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [search, setSearch] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<books_v1.Schema$Volume[]>([]);
  const [status, setStatus] = useState<
    "empty" | "searching" | "scanner" | "results" | "addBook"
  >("empty");
  const [customBookTitle, setCustomBookTitle] = useState("");
  const [customBookISBN, setCustomBookISBN] = useState("");

  const state = useBooksState();
  const dispatch = useBooksStateDispatch();

  const { racks, categories } = state;

  function clearSearch() {
    setResults([]);
    setSearch("");
    setSearchTerm("");
    setCustomBookTitle("");
    setCustomBookISBN("");
  }

  function scanBarcode() {
    setStatus((prev) => {
      if (prev !== "scanner") {
        clearSearch();
      }
      return prev === "scanner" ? "empty" : "scanner";
    });
  }

  function handleSearch(search: string) {
    if (!search) return;
    setStatus("searching");
    setResults([]);
    searchBooks(search).then((data) => {
      if (data.items) {
        setResults(data.items);
      }
      setStatus("results");
    });
  }

  function handleScan(_err: unknown, result: Result | undefined) {
    if (result) {
      setStatus("empty");
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
    setStatus("addBook");
    setCustomBookTitle(title);
    setCustomBookISBN(isbn);
  }

  async function addBook(book: Omit<Book, "id">) {
    const b = {
      ...book,
      id: nanoid(12),
    };

    dispatch({
      type: BooksActionTypes.AddBook,
      book: b,
    });

    clearSearch();
    setStatus("empty");

    await database.editBook(b);
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
          onChange={(e) => setRack(e.target.value)}
          disabled={status == "addBook" || status == "scanner"}
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
          disabled={status == "addBook" || status == "scanner"}
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
              disabled={status == "addBook" || status == "scanner"}
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
                status === "scanner" && "active",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              barcode_scanner
            </span>
          </button>
        </div>
      </div>

      {status === "scanner" && (
        <div className="barcode-scanner-parent">
          <BarcodeScanner handleScan={handleScan} />
        </div>
      )}

      {status === "searching" && (
        <div className="no-results">{"Searching..."}</div>
      )}

      {status === "addBook" && rack && category && (
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
                addBook({
                  title: customBookTitle,
                  authors: [],
                  category,
                  rack,
                  isbn: customBookISBN,
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
                    addBook({
                      title: book.volumeInfo?.title || "Untitled",
                      subtitle: book.volumeInfo?.subtitle,
                      authors: book.volumeInfo?.authors || [],
                      rack,
                      category,
                      coverImage:
                        book.volumeInfo?.imageLinks?.thumbnail?.replace(
                          "&edge=curl",
                          ""
                        ),
                      description: book.volumeInfo?.description,
                      googleBooksCategories: book.volumeInfo?.categories || [],
                      googleBooksId: book.id ? book.id : undefined,
                      isbn:
                        book.volumeInfo?.industryIdentifiers?.find(
                          (id) => id.type === "ISBN_13"
                        )?.identifier ||
                        book.volumeInfo?.industryIdentifiers?.[0]?.identifier,
                      pages: book.volumeInfo?.pageCount,
                      publicationDate: book.volumeInfo?.publishedDate,
                      publisher: book.volumeInfo?.publisher,
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
        {status == "results" && (
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
