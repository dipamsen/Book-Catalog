import Header from "../components/Header";
import "./EditBooks.css";

export default function EditBooks() {
  return (
    <div className="edit-books">
      <Header backLink="/" />
      <h2>Update Rack/Category</h2>

      {/* TODO: Interactive thing allowing to search and add books to some list
        then update the rack/category of all the books in the list 
        (also allow to select all books in a rack/category) 
      */}
    </div>
  );
}
