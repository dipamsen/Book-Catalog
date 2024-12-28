import { useState } from "react";
import Header from "../components/Header";
import { books, bulkUpdate } from "../utils/catalog";
import { BookInfo, categories, Category, Rack, racks } from "../utils/types";
import "./EditBooks.css";

export default function EditBooks() {
  const [newBooks, setNewBooks] = useState<BookInfo[]>(books);
  const [deletedBooks, setDeletedBooks] = useState<string[]>([]);

  function cleanURL(link: string | undefined) {
    if (!link) return "https://via.placeholder.com/100x133";
    return link;
  }

  function saveChanges() {
    const newBooksList = newBooks.filter(
      (book) => !deletedBooks.includes(book.id)
    );

    bulkUpdate(newBooksList, deletedBooks).then(() => {
      alert("Changes saved successfully!");
      setDeletedBooks([]);
      setNewBooks(books);
    });
  }

  return (
    <div className="edit-books">
      <Header backLink="/" />
      <h2>Edit Books</h2>

      <table>
        <thead>
          <tr>
            {/* <th>ID</th> */}
            <th>Image</th>
            <th>Title</th>
            <th>Category</th>
            <th>Rack</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {newBooks.map((book) => (
            <tr key={book.id}>
              {/* <td>{book.id}</td> */}
              <td>
                <img src={cleanURL(book.coverImage)} alt={book.title} />
              </td>
              <td>
                <input
                  type="text"
                  value={book.title}
                  onChange={(e) => {
                    setNewBooks((prev) => [
                      ...prev.map((b) => {
                        if (b.id === book.id) {
                          return {
                            ...b,
                            title: e.target.value,
                          };
                        }
                        return b;
                      }),
                    ]);
                  }}
                />
              </td>
              <td>
                <select
                  value={book.category}
                  onChange={(e) => {
                    setNewBooks((prev) => [
                      ...prev.map((b) => {
                        if (b.id === book.id) {
                          return {
                            ...b,
                            category: e.target.value as Category,
                          };
                        }
                        return b;
                      }),
                    ]);
                  }}
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                <select
                  value={book.rack}
                  onChange={(e) => {
                    setNewBooks((prev) => [
                      ...prev.map((b) => {
                        if (b.id === book.id) {
                          return {
                            ...b,
                            rack: e.target.value as Rack,
                          };
                        }
                        return b;
                      }),
                    ]);
                  }}
                >
                  {racks.map((rack) => (
                    <option key={rack} value={rack}>
                      {rack}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={deletedBooks.includes(book.id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setDeletedBooks((prev) => [...prev, book.id]);
                    } else {
                      setDeletedBooks((prev) =>
                        prev.filter((id) => id !== book.id)
                      );
                    }
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="actions">
        <button onClick={saveChanges}>Save Changes</button>
      </div>
    </div>
  );
}
