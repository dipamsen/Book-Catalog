import { Rack, racks } from "../utils/types";
import "./ViewBooks.css";
import { books } from "../utils/catalog";
import BookTile from "../components/BookTile";
import { useState } from "react";
import Header from "../components/Header";

export default function AddBook() {
  const [activeRack, setActiveRack] = useState<Rack | null>(null);

  // function isRack(rack: string): rack is Rack {
  //   return racks.includes(rack as Rack);
  // }

  return (
    <div className="view-books">
      <Header />
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
          <div className="books">
            {(() => {
              const views = books
                .filter((book) => book.rack === rack)
                .map((book) => <BookTile key={book.id} book={book} />);
              if (views.length === 0) {
                return <div>No books added yet...</div>;
              }
              return views;
            })()}
          </div>
        </div>
      ))}
    </div>
  );
}
