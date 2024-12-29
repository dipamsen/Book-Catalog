import { ref, set } from "@firebase/database";
import { getFirebaseDB } from "./database";
import { BookInfo } from "./types";

const useFirebase = import.meta.env.VITE_DATABASE_TYPE === "firebase";

export async function editBook(book: BookInfo) {
  if (!useFirebase) {
    return;
  }
  const db = getFirebaseDB();
  const bookRef = ref(db, `books/${book.id}`);
  await set(bookRef, book);
}

// export async function updateBook(book: BookInfo) {
//   if (!useFirebase) {
//     const index = books.findIndex((b) => b.id === book.id);
//     if (index !== -1) {
//       books[index] = book;
//     }
//     return;
//   }
//   const db = getFirebaseDB();
//   const docRef = ref(db, `books/${book.id}`);
//   await set(docRef, book);

//   const index = books.findIndex((b) => b.id === book.id);
//   if (index !== -1) {
//     books[index] = book;
//   }
// }

// export async function deleteBook(id: string) {
//   if (!useFirebase) {
//     const index = books.findIndex((b) => b.id === id);
//     if (index !== -1) {
//       books.splice(index, 1);
//     }
//     return;
//   }
//   const db = getFirebaseDB();
//   const docRef = ref(db, `books/${id}`);
//   await set(docRef, null);
//   const index = books.findIndex((b) => b.id === id);
//   if (index !== -1) {
//     books.splice(index, 1);
//   }
// }

// export async function bulkUpdate(newBooks: BookInfo[], deleteBooks: string[]) {
//   if (!useFirebase) {
//     books.splice(0, books.length, ...newBooks);
//     return;
//   }

//   const db = getFirebaseDB();
//   const booksRef = ref(db, "books");
//   const updateInfo: Record<string, BookInfo> = {};
//   newBooks.forEach((book) => {
//     updateInfo[book.id] = book;
//   });
//   await update(booksRef, updateInfo);
//   await Promise.all(
//     deleteBooks.map(async (id) => {
//       const docRef = ref(db, `books/${id}`);
//       await set(docRef, null);
//     })
//   );
//   books.splice(0, books.length, ...newBooks);
// }
