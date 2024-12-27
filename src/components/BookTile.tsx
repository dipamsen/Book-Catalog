import "./BookTile.css";
import { BookInfo } from "../utils/types";
import { Link } from "react-router";
// import { useIsMobile } from "../utils/isMobile";

export default function BookTile({
  book,
  showRack,
  horizontal,
}: {
  book: BookInfo;
  showRack?: boolean;
  horizontal?: boolean;
}) {
  function cleanURL(link: string | undefined) {
    if (!link) return "https://via.placeholder.com/100x133";
    return link;
  }

  showRack = showRack ?? false;

  return (
    <div
      className={["book-tile", horizontal ? "horizontal" : ""].join(" ")}
      key={book.id}
    >
      <Link to={`/book/${book.id}`} className="book-link">
        <img
          src={cleanURL(book.coverImage)}
          className="book-cover"
          alt={book.title}
        />
      </Link>
      <div className="book-details">
        <Link to={`/book/${book.id}`} className="book-link">
          <div className="book-title">{book.title}</div>
        </Link>
        <div className="book-authors">{book.authors?.join(", ")}</div>
        <div className="book-category">
          {book.category?.split("/").join(" / ")}
        </div>
        {showRack && <div className="book-rack">Rack {book.rack}</div>}
      </div>
    </div>
  );
}
