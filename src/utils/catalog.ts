import { get, ref, set, update } from "@firebase/database";
import { getBook } from "./books";
import { getFirebaseDB } from "./database";
import { BookInfo, Category, Rack } from "./types";
import { nanoid } from "nanoid";

export const books: BookInfo[] = [];

const useFirebase = import.meta.env.VITE_DATABASE_TYPE === "firebase";

export async function addGoogleBook(
  gbId: string,
  rack: Rack,
  category: Category
) {
  const bookData = await getBook(gbId);
  const id = nanoid(12);
  const bookInfo: BookInfo = {
    id: id,
    title: bookData.volumeInfo?.title || "Untitled",
    subtitle: bookData.volumeInfo?.subtitle,
    authors: bookData.volumeInfo?.authors || [],
    rack,
    category,
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

export async function addCustomBook(
  title: string,
  rack: Rack,
  category: Category,
  isbn?: string
) {
  const id = nanoid(12);
  const bookInfo: BookInfo = {
    id,
    title,
    authors: [],
    category,
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

export async function updateBook(book: BookInfo) {
  if (!useFirebase) {
    const index = books.findIndex((b) => b.id === book.id);
    if (index !== -1) {
      books[index] = book;
    }
    return;
  }
  const db = getFirebaseDB();
  const docRef = ref(db, `books/${book.id}`);
  await set(docRef, book);

  const index = books.findIndex((b) => b.id === book.id);
  if (index !== -1) {
    books[index] = book;
  }
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
