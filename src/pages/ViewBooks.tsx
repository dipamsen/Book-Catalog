import { Rack, racks } from "../utils/types";
import "./ViewBooks.css";
import { books } from "../utils/catalog";
import BookTile from "../components/BookTile";
import { useState } from "react";
import Header from "../components/Header";

export default function AddBook() {
  const [activeRack, setActiveRack] = useState<Rack | null>(null);

  return (
    <div className="view-books">
      <Header />
      Total Books: {books.length}
      {racks.map((rack) => (
        <div
          key={rack}
          className={["rack", rack === activeRack ? "active" : ""].join(" ")}
        >
          <h2
            onClick={() =>
              setActiveRack((prev) => (prev === rack ? null : rack))
            }
          >
            Rack {rack}
          </h2>
          <div className="rack-content">
            {(() => {
              const rackBooks = books.filter((book) => book.rack === rack);
              const views = rackBooks.map((book) => (
                <BookTile key={book.id} book={book} />
              ));
              if (views.length === 0) {
                return <div>No books added yet...</div>;
              }
              return (
                <>
                  <div>Total Books: {rackBooks.length}</div>
                  <div className="books">{views}</div>
                </>
              );
            })()}
          </div>
        </div>
      ))}
    </div>
  );
}
