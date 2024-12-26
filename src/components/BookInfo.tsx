import { books_v1 } from "googleapis";
import "./BookInfo.css";

export default function BookInfo({ book }: { book: books_v1.Schema$Volume }) {
  const datefmt = new Intl.DateTimeFormat("en-IN", {
    year: "numeric",
    month: "short",
  });

  function fmt(date: string) {
    try {
      return datefmt.format(new Date(date));
    } catch {
      return date;
    }
  }

  function cleanURL(link: string | undefined) {
    if (!link) return "https://via.placeholder.com/100x133";
    return link.replace("&edge=curl", "");
  }

  if (!book.volumeInfo) return null;
  const info = [
    book.volumeInfo.publisher,
    book.volumeInfo.publishedDate && fmt(book.volumeInfo.publishedDate),
    book.volumeInfo.pageCount && book.volumeInfo.pageCount + " pages",
    book.volumeInfo.categories?.join(", "),
  ].filter(Boolean);

  return (
    <div className="book-info" key={book.id}>
      <img
        src={cleanURL(book.volumeInfo.imageLinks?.thumbnail)}
        className="book-cover"
        alt={book.volumeInfo.title}
      />
      <div className="book-details">
        <div className="book-title">{book.volumeInfo.title}</div>
        <div className="book-subtitle">{book.volumeInfo.subtitle}</div>
        <div className="book-authors">
          {book.volumeInfo.authors?.join(", ")}
        </div>
        <div className="book-info truncate-text">{info.join(" | ")}</div>
      </div>
    </div>
  );
}
