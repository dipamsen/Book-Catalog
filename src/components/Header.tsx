import "./Header.css";
import { Link } from "react-router";

export default function Header({ backLink }: { backLink?: string }) {
  return (
    <div className="header">
      {backLink ? (
        <span className="material-symbols-outlined back-icon icon">
          <Link
            to={backLink}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            arrow_back
          </Link>
        </span>
      ) : (
        <span className="material-symbols-outlined book-icon icon">book_2</span>
      )}
      <h1>Books Catalog</h1>
    </div>
  );
}
