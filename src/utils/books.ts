import { books_v1 } from "googleapis";

export function searchBooks(query: string): Promise<books_v1.Schema$Volumes> {
  return fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${query}&projection=full&key=${
      import.meta.env.VITE_GOOGLE_BOOKS_API_KEY
    }`
  ).then((res) => res.json());
}

export function getBook(id: string): Promise<books_v1.Schema$Volume> {
  return fetch(
    `https://www.googleapis.com/books/v1/volumes/${id}&key=${
      import.meta.env.VITE_GOOGLE_BOOKS_API_KEY
    }`
  ).then((res) => res.json());
}
