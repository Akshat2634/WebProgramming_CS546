//TODO EXPORT AND IMPLEMENT THE FOLLOWING FUNCTIONS IN ES6 FORMAT
//Books data link: https://gist.githubusercontent.com/graffixnyc/3381b3ba73c249bfcab1e44d836acb48/raw/e14678cd750a4c4a93614a33a840607dd83fdacc/books.json
import { getBooks } from "./helpers.js";
import { isNumber } from "./helpers.js";

const getBookById = async (id) => {
  if (
    !id ||
    typeof id !== "string" ||
    id.length === 0 ||
    id.trim().length === 0
  ) {
    throw Error("ID is required and must be a non-empty string");
  }
  id = id.trim();
  const books = await getBooks();
  const book = books.find((book) => book.id === id);

  if (!book) {
    throw Error("Book not found");
  }
  return book;
};

const booksByPageCount = async (min, max) => {
  if (!min || !max) {
    throw Error("Both min and max parameters are required");
  }

  if (!isNumber(min) || !isNumber(max)) {
    throw Error("Min and max parameters must be valid numbers");
  }

  if (!Number.isInteger(min) || !Number.isInteger(max)) {
    throw Error("Both min and max should be positive integers");
  }
  if (min < 0 || max <= 0) {
    throw Error("Both min and max should be positive integers");
  }
  if (max <= min) {
    throw Error("Max parameter should be greater than min parameter");
  }
  const books = await getBooks();
  const filteredBooks = books.filter(
    (book) => book.pageCount >= min && book.pageCount <= max
  );
  if (filteredBooks.length === 0) {
    throw Error("No books found");
  }
  const result = filteredBooks.map((book) => book.id);
  if (result.length === 0) {
    throw Error("No books found");
  }
  return result;
};

const sameYear = async (year) => {
  if (!year) {
    throw Error("Year is required");
  }
  if (!isNumber(year)) {
    throw Error("Year must be a valid number");
  }
  if (!Number.isInteger(year)) {
    throw Error("Year must be an integer number");
  }
  if (year < 0) {
    throw Error("Year must be a valid year");
  }
  if (year.toString().length !== 4) {
    throw Error("Year must be a 4-digit number");
  }
  const books = await getBooks();
  const filteredBooks = books.filter(
    (book) => new Date(book.publicationDate).getFullYear() === year
  );
  if (filteredBooks.length === 0) {
    throw Error("No books found");
  }
  return filteredBooks;
};

const minMaxPrice = async () => {
  const books = await getBooks();
  let prices = [];
  books.forEach((book) => {
    prices.push(book.price);
  });
  prices = prices.sort((a, b) => a - b);
  let cheapest = prices[0];
  let mostExpensive = prices[prices.length - 1];
  const cheapestBooks = books.filter((book) => book.price === cheapest);
  const mostExpensiveBooks = books.filter(
    (book) => book.price === mostExpensive
  );

  if (cheapestBooks.length === 0 || mostExpensiveBooks.length === 0) {
    throw Error("No books found");
  }
  return {
    cheapest: cheapestBooks.map((book) => book.id),
    mostExpensive: mostExpensiveBooks.map((book) => book.id),
  };
};

const searchBooksByPublisher = async (publisher) => {
  if (
    !publisher ||
    typeof publisher !== "string" ||
    publisher.trim().length === 0
  ) {
    throw Error("Publisher is required and must be a non-empty string");
  }
  publisher = publisher.trim();
  const books = await getBooks();
  const publisherExists = books.find((book) => book.publisher === publisher);

  if (!publisherExists) {
    throw Error("Publisher name cannot be found in the dataset");
  }

  const filteredBooks = books.filter((book) => book.publisher === publisher);

  if (filteredBooks.length === 0) {
    return [];
  }

  return filteredBooks.map((book) => book.id);
};

export {
  getBookById,
  booksByPageCount,
  sameYear,
  minMaxPrice,
  searchBooksByPublisher,
};
