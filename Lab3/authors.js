//TODO EXPORT AND IMPLEMENT THE FOLLOWING FUNCTIONS IN ES6 FORMAT
//Authors data link: https://gist.githubusercontent.com/graffixnyc/a086a55e04f25e538b5d52a095fe4467/raw/e9f835e9a5439a647a24fa272fcb8f5a2b94dece/authors.json

//you must use axios to get the data

import {
  getAuthors,
  isNumber,
  calculateAge,
  getBooks,
  isStateValid,
} from "./helpers.js";
import { getBookById } from "./books.js";

const getAuthorById = async (id) => {
  if (!id || typeof id !== "string" || id.trim().length === 0) {
    throw Error("ID is required and must be a non-empty string");
  }
  id = id.trim();

  const authors = await getAuthors();
  const author = authors.find((author) => author.id === id);
  if (!author) {
    throw Error("Author not found");
  }
  return author;
};

const searchAuthorsByAge = async (age) => {
  if (
    !age ||
    typeof age === "string" ||
    !isNumber(age) ||
    age < 1 ||
    age > 100 ||
    !Number.isInteger(age)
  ) {
    throw Error(
      "Age is required, must be a number between 1 and 100, and must be an integer"
    );
  }
  const authors = await getAuthors();
  const authorsByAge = authors
    .filter((author) => calculateAge(author.date_of_birth) >= age)
    .map((author) => {
      return `${author.first_name} ${author.last_name}`;
    });
  if (authorsByAge.length === 0) {
    throw Error("No authors found");
  }
  return authorsByAge;
};

const getBooksByState = async (state) => {
  if (
    !state ||
    typeof state !== "string" ||
    state.trim().length !== 2 ||
    !isStateValid(state.trim())
  ) {
    throw Error(
      "State is required, must be a string of exactly 2 characters, and must be a valid US state abbreviation"
    );
  }
  state = state.trim();
  state = state.toUpperCase();
  const authors = await getAuthors();
  const books = await getBooks();
  const authorsFromState = authors.filter(
    (author) =>
      author.HometownState &&
      typeof author.HometownState === "string" &&
      author.HometownState.toUpperCase() === state
  );
  const booksFromState = books.filter((book) =>
    authorsFromState.some((author) => author.id === book.authorId)
  );
  if (booksFromState.length === 0) {
    throw Error("No books found from authors from the specified state");
  }
  return booksFromState.map((book) => book.title);
};

const searchAuthorsByHometown = async (town, state) => {
  if (!town || typeof town !== "string" || town.trim().length === 0) {
    throw Error("Town is required and must be a non-empty string");
  }

  if (
    !state ||
    typeof state !== "string" ||
    state.trim().length !== 2 ||
    !isStateValid(state.trim())
  ) {
    throw Error(
      "State is required, must be a string of exactly 2 characters, and must be a valid US state abbreviation"
    );
  }
  town = town.trim();
  state = state.trim();
  state = state.toUpperCase();
  const authors = await getAuthors();
  const authorsFromHometown = authors.filter(
    (author) =>
      author.HometownCity &&
      typeof author.HometownCity === "string" &&
      author.HometownCity.toUpperCase() === town.toUpperCase() &&
      author.HometownState &&
      typeof author.HometownState === "string" &&
      author.HometownState.toUpperCase() === state
  );
  return authorsFromHometown
    .map((author) => ({
      name: `${author.first_name} ${author.last_name}`,
      lastName: author.last_name,
    }))
    .sort((a, b) => a.lastName.localeCompare(b.lastName))
    .map((author) => author.name);
};

const getAuthorBooks = async (authorid) => {
  if (
    !authorid ||
    typeof authorid !== "string" ||
    authorid.length === 0 ||
    authorid.trim().length === 0
  ) {
    throw new Error("Author ID is required and must be a non-empty string");
  }

  authorid = authorid.trim();

  const authors = await getAuthors();
  const author = authors.find((author) => author.id === authorid);
  if (!author) {
    throw Error("Author not found");
  }

  if (author.books.length > 0) {
    const bookNames = [];
    for (let i = 0; i < author.books.length; i++) {
      const book = await getBookById(author.books[i]);
      bookNames.push(book.title);
    }
    return bookNames;
  } else {
    return [];
  }
};

export {
  getAuthorById,
  searchAuthorsByAge,
  getBooksByState,
  searchAuthorsByHometown,
  getAuthorBooks,
};
