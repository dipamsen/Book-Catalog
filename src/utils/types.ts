export type Rack =
  | "A1"
  | "A2"
  | "A3"
  | "A4"
  | "A5"
  | "A6"
  | "A7"
  | "A8"
  | "A9"
  | "A10"
  | "A11"
  | "A12"
  | "A13"
  | "A14"
  | "B1"
  | "B2"
  | "B3"
  | "B4"
  | "B5"
  | "B6"
  | "B7"
  | "B8"
  | "B9"
  | "B10"
  | "B11"
  | "B12"
  | "B13"
  | "B14";

export const racks: Rack[] = [
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
] as const;

export interface BookInfo {
  id: string;
  title: string;
  authors: string[];
  coverImage?: string;
  subtitle?: string;
  description?: string;
  publisher?: string;
  publicationDate?: string;
  category?: string;
  isbn?: string;
  pages?: number;
  googleBooksId?: string;
  googleBooksCategories?: string[];
  rack: Rack;
}
