import BookTile from "../components/BookTile";
import "./Home.css";
import { books } from "../utils/catalog";
import { BookInfo } from "../utils/types";
import { fetchQuote, Quote } from "../utils/quotes";
import { useEffect, useState } from "react";

export default function Home() {
  const [quote, setQuote] = useState<Quote>();
  const [recommended, setRecommended] = useState<BookInfo[]>([]);

  useEffect(() => {
    const recommended: BookInfo[] = [];
    if (books.length < 3) return setRecommended(books);
    for (let i = 0; i < 3; i++) {
      const book = books[Math.floor(Math.random() * books.length)];
      if (!recommended.includes(book)) recommended.push(book);
      else i--;
    }
    setRecommended(recommended);
  }, []);

  useEffect(() => {
    async function get() {
      const quote = await fetchQuote();
      setQuote(quote);
    }
    get();
  }, []);

  return (
    <div className="home">
      <div className="actions">
        <a href="/view" className="btn">
          Browse Catalog
        </a>
        <a href="/search" className="btn">
          Search Book
        </a>
        <a href="/add" className="btn">
          Add Book
        </a>
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
            {recommended.map((book) => (
              <BookTile key={book.id} book={book} showRack />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
