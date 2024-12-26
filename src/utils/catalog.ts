import { get, ref, set, update } from "@firebase/database";
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
    custom: false,
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

export async function addCustomBook(isbn: string, title: string, rack: Rack) {
  const bookInfo = {
    id: isbn,
    title,
    info: {
      title,
      authors: ["Unknown Author"],
    },
    rack,
    custom: true,
  };
  if (!useFirebase) {
    books.push(bookInfo);
    return;
  }
  const db = getFirebaseDB();
  const docRef = ref(db, `books/${isbn}`);
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

export async function bulkUpdate(newBooks: BookInfo[], deleteBooks: string[]) {
  if (!useFirebase) {
    books.splice(0, books.length, ...newBooks);
    return;
  }

  const db = getFirebaseDB();
  const booksRef = ref(db, "books");
  const updateInfo: Record<string, BookInfo> = {};
  newBooks.forEach((book) => {
    updateInfo[book.id] = book;
  });
  await update(booksRef, updateInfo);
  await Promise.all(
    deleteBooks.map(async (id) => {
      const docRef = ref(db, `books/${id}`);
      await set(docRef, null);
    })
  );
  books.splice(0, books.length, ...newBooks);
}
