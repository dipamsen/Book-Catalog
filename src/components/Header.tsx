import "./Header.css";
import { useNavigate } from "react-router";

export default function Header({ backLink }: { backLink?: string }) {
  const navigate = useNavigate();
  return (
    <div className="header">
      {backLink ? (
        <span
          className="material-symbols-outlined back-icon icon"
          onClick={() => {
            if (window.history.length > 1) {
              navigate(-1);
            } else {
              navigate("/");
            }
          }}
        >
          {/* <Link
            to={backLink}
            style={{ textDecoration: "none", color: "inherit" }}
          > */}
          arrow_back
          {/* </Link> */}
        </span>
      ) : (
        <span className="material-symbols-outlined book-icon icon">book_2</span>
      )}
      <h1>Books Catalog</h1>
    </div>
  );
}
