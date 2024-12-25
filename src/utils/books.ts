import { books_v1 } from "googleapis";

export function searchBooks(query: string): Promise<books_v1.Schema$Volumes> {
  return fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${query}&projection=full`
  ).then((res) => res.json());
}

export function getBook(id: string): Promise<books_v1.Schema$Volume> {
  return fetch(`https://www.googleapis.com/books/v1/volumes/${id}`).then(
    (res) => res.json()
  );
}
