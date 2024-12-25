import { Rack, racks } from "../utils/types";
import "./ViewBooks.css";
import { books } from "../utils/catalog";
import BookTile from "../components/BookTile";
import { useState } from "react";

export default function AddBook() {
  const [activeRack, setActiveRack] = useState<Rack | null>(null);

  // function isRack(rack: string): rack is Rack {
  //   return racks.includes(rack as Rack);
  // }

  return (
    <div className="view-books">
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
            {books
              .filter((book) => book.rack === rack)
              .map((book) => (
                <BookTile key={book.id} book={book} />
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
