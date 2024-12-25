import { get, ref, set } from "@firebase/database";
import { getBook } from "./books";
import { db } from "./database";
import { BookInfo, Rack } from "./types";

export const books: BookInfo[] = [];

export async function addBook(id: string, rack: Rack) {
  const book = await getBook(id);
  const bookInfo = {
    id: book.id!,
    title: book.volumeInfo!.title!,
    info: book.volumeInfo!,
    rack,
  };
  const docRef = ref(db, `books/${book.id}`);
  await set(docRef, bookInfo);
  books.push(bookInfo);
}

export async function loadBooks() {
  if (books.length > 0) return;
  const booksRef = ref(db, "books");
  const snapshot = await get(booksRef);
  if (snapshot.exists() && books.length === 0) {
    const data = snapshot.val();
    Object.keys(data).forEach((key) => {
      books.push(data[key]);
    });
  }
}

export function clearBooks() {
  books.splice(0, books.length);
}
