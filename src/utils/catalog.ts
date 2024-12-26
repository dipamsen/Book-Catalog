import { get, ref, set } from "@firebase/database";
import { getBook } from "./books";
import { getFirebaseDB } from "./database";
import { BookInfo, Rack } from "./types";

export const books: BookInfo[] = [];

const useFirebase = import.meta.env.VITE_DATABASE_TYPE === "firebase";

export async function addBook(id: string, rack: Rack) {
  const book = await getBook(id);
  const bookInfo = {
    id: book.id!,
    title: book.volumeInfo!.title!,
    info: book.volumeInfo!,
    rack,
  };
  if (!useFirebase) {
    books.push(bookInfo);
    return;
  }
  const db = getFirebaseDB();
  const docRef = ref(db, `books/${book.id}`);
  await set(docRef, bookInfo);
  books.push(bookInfo);
}

export async function loadBooks() {
  if (books.length > 0) return;
  if (!useFirebase) return;
  const db = getFirebaseDB();
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
