import "./Header.css";
import { Link, useLocation, useResolvedPath } from "react-router";

export default function Header() {
  const loc = useLocation();
  const path = useResolvedPath("../");

  return (
    <div className="header">
      {loc.pathname === "/" ? (
        <span className="material-symbols-outlined book-icon icon">book_2</span>
      ) : (
        <span className="material-symbols-outlined back-icon icon">
          <Link to={path} style={{ textDecoration: "none", color: "inherit" }}>
            arrow_back
          </Link>
        </span>
      )}
      <h1>Books Catalog</h1>
    </div>
  );
}
