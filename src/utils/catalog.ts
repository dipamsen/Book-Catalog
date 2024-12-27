import { get, ref, set, update } from "@firebase/database";
import { getBook } from "./books";
import { getFirebaseDB } from "./database";
import { BookInfo, Rack } from "./types";
import { nanoid } from "nanoid";

export const books: BookInfo[] = [];

const useFirebase = import.meta.env.VITE_DATABASE_TYPE === "firebase";

export async function addGoogleBook(gbId: string, rack: Rack) {
  const bookData = await getBook(gbId);
  const id = nanoid(12);
  const bookInfo: BookInfo = {
    id: id,
    title: bookData.volumeInfo?.title || "Untitled",
    subtitle: bookData.volumeInfo?.subtitle,
    authors: bookData.volumeInfo?.authors || [],
    rack,
    coverImage: bookData.volumeInfo?.imageLinks?.thumbnail,
    description: bookData.volumeInfo?.description,
    googleBooksCategories: bookData.volumeInfo?.categories || [],
    googleBooksId: gbId,
    isbn:
      bookData.volumeInfo?.industryIdentifiers?.find(
        (id) => id.type === "ISBN_13"
      )?.identifier ||
      bookData.volumeInfo?.industryIdentifiers?.[0]?.identifier,
    pages: bookData.volumeInfo?.pageCount,
    publicationDate: bookData.volumeInfo?.publishedDate,
    publisher: bookData.volumeInfo?.publisher,
  };
  if (!useFirebase) {
    books.push(bookInfo);
    return;
  }
  const db = getFirebaseDB();
  const docRef = ref(db, `books/${bookInfo.id}`);
  await set(docRef, bookInfo);
  books.push(bookInfo);
}

export async function addCustomBook(isbn: string, title: string, rack: Rack) {
  const id = nanoid(12);
  const bookInfo: BookInfo = {
    id,
    title,
    authors: [],
    rack,
    isbn,
  };
  if (!useFirebase) {
    books.push(bookInfo);
    return;
  }
  const db = getFirebaseDB();
  const docRef = ref(db, `books/${bookInfo.id}`);
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
