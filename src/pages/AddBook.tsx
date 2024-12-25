import { useState } from "react";
import "./AddBook.css";
import { Rack, racks } from "../utils/types";
import BookInfo from "../components/BookInfo";
import { searchBooks } from "../utils/books";
import { books_v1 } from "googleapis";
import { addBook } from "../utils/catalog";

export default function AddBook() {
  const [rack, setRack] = useState<Rack | "">("");
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<books_v1.Schema$Volume[]>([]);

  // function isRack(rack: string): rack is Rack {
  //   return racks.includes(rack as Rack);
  // }

  return (
    <div className="add-book">
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
        <form
          className="search-form"
          onSubmit={(e) => {
            e.preventDefault();
            searchBooks(search).then((data) => {
              if (data.items) setResults(data.items);
            });
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
      </div>

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
