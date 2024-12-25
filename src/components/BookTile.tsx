import "./BookTile.css";
import { BookInfo } from "../utils/types";
// import { useIsMobile } from "../utils/isMobile";

export default function BookTile({
  book,
  showRack,
}: {
  book: BookInfo;
  showRack?: boolean;
}) {
  function cleanURL(link: string | undefined) {
    if (!link) return "https://via.placeholder.com/100x133";
    return link.replace("&edge=curl", "");
  }

  showRack = showRack ?? false;

  return (
    <div className="book-tile" key={book.id}>
      <img
        src={cleanURL(book.info?.imageLinks?.thumbnail)}
        className="book-cover"
        alt={book.info?.title}
      />
      <div className="book-details">
        <div className="book-title">{book.info?.title}</div>
        <div className="book-authors">{book.info?.authors?.join(", ")}</div>
        {showRack && <div className="book-rack">Rack {book.rack}</div>}
      </div>
    </div>
  );
}
