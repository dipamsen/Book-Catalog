import { useNavigate, useParams } from "react-router";
import Header from "../components/Header";
import { books, updateBook } from "../utils/catalog";
import "./EditBook.css";
import { categories, Category, Rack, racks } from "../utils/types";
import { useState } from "react";

export default function EditBook() {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState(books.find((book) => book.id === id));
  const navigate = useNavigate();

  if (!id || !book) {
    return null;
  }

  return (
    <div className="edit-book">
      <Header backLink={`/book/${id}`} />

      <h2>Edit Book</h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          updateBook(book).then(() => {
            navigate(`/book/${id}`);
          });
        }}
      >
        <label htmlFor="title">Title *</label>
        <input
          type="text"
          id="title"
          value={book.title}
          onChange={(e) => setBook({ ...book, title: e.target.value })}
        />

        <label htmlFor="authors">Authors *</label>
        <input
          type="text"
          id="authors"
          value={book.authors?.join(", ") || ""}
          onChange={(e) =>
            setBook({ ...book, authors: e.target.value.split(", ") })
          }
        />

        <label htmlFor="subtitle">Subtitle</label>
        <input
          type="text"
          id="subtitle"
          value={book.subtitle}
          onChange={(e) => setBook({ ...book, subtitle: e.target.value })}
        />

        <label htmlFor="category">Category *</label>
        <select
          id="category"
          value={book.category}
          onChange={(e) =>
            setBook({ ...book, category: e.target.value as Category })
          }
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <label htmlFor="rack">Rack</label>
        <select
          id="rack"
          value={book.rack}
          onChange={(e) => setBook({ ...book, rack: e.target.value as Rack })}
        >
          {racks.map((rack) => (
            <option key={rack} value={rack}>
              {rack}
            </option>
          ))}
        </select>

        <label htmlFor="publicationDate">Publication Date</label>
        <input
          type="date"
          id="publicationDate"
          value={book.publicationDate}
          onChange={(e) =>
            setBook({ ...book, publicationDate: e.target.value })
          }
        />

        <label htmlFor="pages">Pages</label>
        <input
          type="number"
          id="pages"
          value={book.pages}
          onChange={(e) =>
            setBook({ ...book, pages: parseInt(e.target.value) })
          }
        />

        <label htmlFor="isbn">ISBN</label>
        <input
          type="text"
          id="isbn"
          value={book.isbn}
          onChange={(e) => setBook({ ...book, isbn: e.target.value })}
        />

        <label htmlFor="coverImage">Cover Image</label>
        <input
          type="text"
          id="coverImage"
          value={book.coverImage}
          onChange={(e) => setBook({ ...book, coverImage: e.target.value })}
        />

        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          rows={8}
          value={book.description}
          onChange={(e) => setBook({ ...book, description: e.target.value })}
        ></textarea>

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}
