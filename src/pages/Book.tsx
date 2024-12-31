import { Link, useNavigate, useParams } from "react-router";
import Header from "../components/Header";
import "./Book.css";
import { useBooksState } from "../utils/BooksContext";
import { getFirebaseDB } from "../utils/database";
import { ref, remove } from "@firebase/database";

export default function Book() {
  const { id } = useParams<{ id: string }>();

  const { books } = useBooksState();
  const navigate = useNavigate();

  const datefmt = new Intl.DateTimeFormat("en-IN", {
    year: "numeric",
    month: "short",
  });

  function fmt(date: string | undefined) {
    if (!date) return "";
    try {
      return datefmt.format(new Date(date));
    } catch {
      return date;
    }
  }

  function cleanURL(link: string | undefined) {
    if (!link) return "https://via.placeholder.com/100x133";
    return link;
  }

  async function handleDelete(id: string) {
    const db = getFirebaseDB();
    const booksRef = ref(db, `books/${id}`);
    await remove(booksRef);
    navigate(-1);
  }

  if (!books.find((book) => book.id === id)) {
    return (
      <div>
        <h1>Book not found</h1>
      </div>
    );
  }

  const book = books.find((book) => book.id === id)!;

  return (
    <div className="book-page">
      <Header backLink="/books" />
      <div className="book-title">{book.title}</div>
      <div className="book-authors">{book.authors?.join(", ")}</div>
      <div className="rack">Rack {book.rack}</div>

      <div className="mid">
        <img
          src={cleanURL(book.coverImage)}
          className="book-cover"
          alt={book.title}
        />

        <div className="side">
          <div className="subtitle">{book.subtitle}</div>
          <div className="categories">{book.category}</div>
          {book.publicationDate && (
            <div className="published-date">{fmt(book.publicationDate)}</div>
          )}
          {book.pages && <div className="page-count">{book.pages} pages</div>}
        </div>
      </div>
      <div
        className="description"
        dangerouslySetInnerHTML={{
          __html: book.description || "",
        }}
      ></div>

      <div className="actions">
        <Link to={`/edit/${book.id}`} className="btn">
          Edit
        </Link>
        <button
          className="btn"
          onClick={() => {
            if (confirm("Are you sure you want to delete this book?")) {
              handleDelete(book.id);
            }
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
