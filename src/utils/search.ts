import { BookInfo } from "./types";
import Fuse from "fuse.js";

export function searchFilter(books: BookInfo[], search: string) {
  if (search.split("").every((c) => "0123456789".includes(c))) {
    return books.filter((book) => book.isbn?.includes(search));
  }

  const fuse = new Fuse(books, {
    keys: ["title", "isbn", "authors", "subtitle", "description"],
  });

  return fuse.search(search).map((result) => result.item);
}
