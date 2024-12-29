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
  rack: string;
}
