import { useCallback, useEffect, useState } from "react";
import Header from "../components/Header";
import "./Update.css";
import { searchFilter } from "../utils/search";
import { useBooksState } from "../utils/BooksContext";
import { BookInfo } from "../utils/types";
import { getFirebaseDB } from "../utils/database";
import { ref, set } from "@firebase/database";

export default function UpdateBooks() {
  const [selectedBooks, setSelectedBooks] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [rack, setRack] = useState<string | "">("");
  const [category, setCategory] = useState<string | "">("");

  const { books, racks, categories } = useBooksState();

  const handleSearch = useCallback(
    (search: string) => {
      if (!search) setSearchResults([]);
      else setSearchResults(searchFilter(books, search).map((book) => book.id));
    },
    [books]
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      handleSearch(search);
    }, 500);

    return () => clearTimeout(timeout);
  }, [search, handleSearch]);

  function handleBookSelect() {
    if (searchResults.length > 0) {
      setSelectedBooks((prev) =>
        prev.includes(searchResults[0]) ? prev : [...prev, searchResults[0]]
      );
      setSearchResults([]);
      setSearch("");
    }
  }

  async function handleBookUpdate(selectedBooks: string[]) {
    if (rack || category) {
      const db = getFirebaseDB();
      for (const id of selectedBooks) {
        const book = books.find((b) => b.id === id)!;
        const bookRef = ref(db, `books/${id}`);
        await set(bookRef, {
          ...book,
          rack: rack || book.rack,
          category: category || book.category,
        });
      }
      setSelectedBooks([]);
      setRack("");
      setCategory("");
      setSearch("");
    }
  }

  return (
    <div className="edit-books">
      <Header backLink="/" />
      <h2>Update Rack/Category</h2>

      <div className="searching">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleBookSelect();
          }}
        >
          <input
            type="search"
            name="search"
            id="search-book"
            placeholder="Search Book"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>
        <div className="results">
          {searchResults.slice(0, 5).map((id) => (
            <div
              key={id}
              className={["search-result"].join(" ")}
              onClick={() => {
                setSelectedBooks((prev) =>
                  prev.includes(id) ? prev : [...prev, id]
                );
                setSearchResults([]);
                setSearch("");
              }}
            >
              <Result key={id} book={books.find((b) => b.id === id)!} />
            </div>
          ))}
        </div>
      </div>

      {selectedBooks.length > 0 && (
        <>
          <div className="selected-books">
            <h3>Selected Books</h3>
            <div className="books">
              {selectedBooks.map((id) => (
                <div key={id} className="selected-book">
                  <SelectedBook
                    key={id}
                    book={books.find((b) => b.id === id)!}
                    remove={() =>
                      setSelectedBooks((prev) =>
                        prev.filter((bookId) => bookId !== id)
                      )
                    }
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="actions">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleBookUpdate(selectedBooks);
              }}
            >
              <label htmlFor="rack">Rack</label>
              <select
                name="rack"
                id="rack"
                onChange={(e) => setRack(e.target.value)}
                value={rack}
              >
                <option value="">
                  <em>Unchanged</em>
                </option>
                {racks.map((rack) => (
                  <option key={rack} value={rack}>
                    {rack}
                  </option>
                ))}
              </select>
              <label htmlFor="category">Category</label>
              <select
                name="category"
                id="category"
                onChange={(e) => setCategory(e.target.value)}
                value={category}
              >
                <option value="">
                  <em>Unchanged</em>
                </option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <button type="submit">Update</button>
            </form>
          </div>
        </>
      )}
    </div>
  );
}

function Result({ book }: { book: BookInfo }) {
  function cleanURL(coverImage: string | undefined): string {
    if (!coverImage) return "https://via.placeholder.com/100x133";
    return coverImage;
  }

  return (
    <>
      <img src={cleanURL(book.coverImage)} alt={book.title} className="cover" />
      <div className="book-data">
        <div className="title">{book.title}</div>
        <div className="authors">{book.authors?.join(", ")}</div>
        <div>
          Rack {book.rack} / {book.category}
        </div>
      </div>
    </>
  );
}

function SelectedBook({
  book,
  remove,
}: {
  book: BookInfo;
  remove: () => void;
}) {
  function cleanURL(coverImage: string | undefined): string {
    if (!coverImage) return "https://via.placeholder.com/100x133";
    return coverImage;
  }

  return (
    <>
      <img src={cleanURL(book.coverImage)} alt={book.title} className="cover" />
      <div className="det">
        <div className="title">{book.title}</div>
        <div>
          <span onClick={remove} className="remove">
            X
          </span>
        </div>
      </div>
    </>
  );
}
