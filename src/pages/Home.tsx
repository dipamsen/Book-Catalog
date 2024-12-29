import BookTile from "../components/BookTile";
import "./Home.css";
import { fetchQuote, Quote } from "../utils/quotes";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import { Link } from "react-router";
import { useBooksState } from "../utils/BooksContext";

export default function Home() {
  const [quote, setQuote] = useState<Quote>();
  const [recommended, setRecommended] = useState<string[]>([]);
  const state = useBooksState();

  const books = state.books;

  useEffect(() => {
    const recommended: string[] = [];
    if (books.length < 3) return setRecommended(books.map((b) => b.id));
    for (let i = 0; i < 3; i++) {
      const book = books[Math.floor(Math.random() * books.length)];
      if (!recommended.includes(book.id)) recommended.push(book.id);
      else i--;
    }
    setRecommended(recommended);
  }, [books]);

  useEffect(() => {
    async function get() {
      const quote = await fetchQuote();
      setQuote(quote);
    }
    get();
  }, []);

  return (
    <div className="home">
      <Header />
      <div className="actions">
        <Link to="/books" className="btn">
          Browse Catalog
        </Link>
        <Link to="/search" className="btn">
          Search Book
        </Link>
        <Link to="/add" className="btn">
          Add Book
        </Link>
      </div>

      {quote && (
        <div className="quote">
          <blockquote>{quote.quote}</blockquote>
          <cite>{quote.by}</cite>
        </div>
      )}

      {recommended.length > 0 && (
        <div className="recommended">
          <h2>Recommended Books</h2>
          <div className="books">
            {recommended.map((id) => (
              <BookTile
                key={id}
                book={books.find((b) => b.id == id)!}
                showRack
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
