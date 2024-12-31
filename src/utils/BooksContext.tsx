import { createContext, useContext } from "react";
import { BookInfo } from "./types";

interface BooksState {
  books: BookInfo[];
  categories: string[];
  racks: string[];
}

export const initialState = {
  books: [],
  categories: [
    "Fiction",
    "Non-Fiction",
    "Science and Technology",
    "History and Politics",
    "Fantasy and Sci-Fi",
    "Mystery and Thriller",
  ],
  racks: [
    "A1",
    "A2",
    "A3",
    "A4",
    "A5",
    "A6",
    "A7",
    "A8",
    "A9",
    "A10",
    "A11",
    "A12",
    "A13",
    "A14",
    "B1",
    "B2",
    "B3",
    "B4",
    "B5",
    "B6",
    "B7",
    "B8",
    "B9",
    "B10",
    "B11",
    "B12",
    "B13",
    "B14",
  ],
};

export const BooksContext = createContext<BooksState>(initialState);
export const BooksDispatchContext = createContext<React.Dispatch<BooksAction>>(
  () => {}
);

export enum BooksActionTypes {
  SetBooks,
  AddBook,
  UpdateBook,
  DeleteBook,

  SetCategories,

  SetRacks,
}

export interface SetBooksAction {
  type: BooksActionTypes.SetBooks;
  books: BookInfo[];
}

export interface AddBookAction {
  type: BooksActionTypes.AddBook;
  book: BookInfo;
}

export interface UpdateBookAction {
  type: BooksActionTypes.UpdateBook;
  book: BookInfo;
}

export interface DeleteBookAction {
  type: BooksActionTypes.DeleteBook;
  id: string;
}

export interface SetCategoriesAction {
  type: BooksActionTypes.SetCategories;
  categories: string[];
}

export interface SetRacksAction {
  type: BooksActionTypes.SetRacks;
  racks: string[];
}

export type BooksAction =
  | SetBooksAction
  | AddBookAction
  | UpdateBookAction
  | DeleteBookAction
  | SetCategoriesAction
  | SetRacksAction;

export function booksStateReducer(state: BooksState, action: BooksAction) {
  switch (action.type) {
    case BooksActionTypes.SetBooks:
      return { ...state, books: action.books };
    case BooksActionTypes.AddBook:
      return { ...state, books: [...state.books, action.book] };
    case BooksActionTypes.UpdateBook:
      return {
        ...state,
        books: state.books.map((book) =>
          book.id === action.book.id ? action.book : book
        ),
      };
    case BooksActionTypes.DeleteBook:
      return {
        ...state,
        books: state.books.filter((book) => book.id !== action.id),
      };
    case BooksActionTypes.SetCategories:
      return { ...state, categories: action.categories };
    default:
      return state;
  }
}

export function useBooksState() {
  return useContext(BooksContext);
}

export function useBooksStateDispatch() {
  return useContext(BooksDispatchContext);
}
