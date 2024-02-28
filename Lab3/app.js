/*
This file is where you will import your functions from the two other files and run test cases on your functions by calling them with various inputs.  We will not use this file for grading and is only for your testing purposes to make sure:

1. Your functions in your 2 files are exporting correctly.

2. They are returning the correct output based on the input supplied (throwing errors when you're supposed to, returning the right results etc..).

Note: 
1. You will need that calls your functions like the example below. 
2. Do not create any other files beside the 'package.json' - meaning your zip should only have the files and folder in this stub and a 'package.json' file.
3. Submit all files (including package.json) in a zip with your name in the following format: LastName_FirstName.zip.
4. DO NOT submit a zip containing your node_modules folder.

import * as authors from "./authors.js");

    try{
        const authorData = await authors.getAuthors();
        console.log (authorData);
    }catch(e){
        console.log (e);
    }
*/
import {
  getAuthorById,
  searchAuthorsByAge,
  getBooksByState,
  searchAuthorsByHometown,
  getAuthorBooks,
} from "./authors.js";

import {
  getBookById,
  booksByPageCount,
  sameYear,
  minMaxPrice,
  searchBooksByPublisher,
} from "./books.js";

//authors.js
// getAuthorById
try {
  const a = await getAuthorById("   1871e6d7-551f-41cb-9a07-08240b86c95c    ");
  console.log(a);
} catch (error) {
  console.log(error.message);
}

try {
  const a = await getAuthorById("   ");
  console.log(a);
} catch (error) {
  console.log(error.message);
}

// searchAuthorsByAge
try {
  const a = await searchAuthorsByAge(40);
  console.log(a);
} catch (error) {
  console.log(error.message);
}

try {
  const a = await searchAuthorsByAge("abc"); // Throws Error
  console.log(a);
} catch (error) {
  console.log(error.message);
}

// getBooksByState;
try {
  const a = await getBooksByState(" nj ");
  console.log(a);
} catch (error) {
  console.log(error.message);
}
try {
  const a = await getBooksByState(123);
  console.log(a);
} catch (error) {
  console.log(error.message);
}

//searchAuthorsByHometown
try {
  const a = await searchAuthorsByHometown("New York city", "NY");
  console.log(a);
} catch (error) {
  console.log(error.message);
}

try {
  const a = await searchAuthorsByHometown("New York City", 1); // Throws Error
  console.log(a);
} catch (error) {
  console.log(error.message);
}

// getAuthorBooks
try {
  const a = await getAuthorBooks("69b3f32f-5690-49d1-b9a6-9d2dd7d6e6cd"); // Returns: ["Jason X", "Nanny McPhee"]
  console.log(a);
} catch (error) {
  console.log(error.message);
}

try {
  const a = await getAuthorBooks("22"); // Throws Error
  console.log(a);
} catch (error) {
  console.log(error.message);
}

// Books.js
// getBookById;
try {
  const a = await getBookById("99875ad8-a1d3-42ea-8d7b-5ac4cd4edb9e");

  console.log(a);
} catch (error) {
  console.log(error.message);
}

try {
  const a = await getBookById("");

  console.log(a);
} catch (error) {
  console.log(error.message);
}

// booksByPageCount
try {
  const a = await booksByPageCount(300, 500);
  console.log(a);
} catch (error) {
  console.log(error.message);
}

try {
  const a = await booksByPageCount("ABC", 100);
  console.log(a);
} catch (error) {
  console.log(error.message);
}

// sameYear
try {
  const a = await sameYear(2000);
  console.log(a);
} catch (error) {
  console.log(error.message);
}
try {
  const a = await sameYear("ABC");
  console.log(a);
} catch (error) {
  console.log(error.message);
}

// minMaxPrice
try {
  const a = await minMaxPrice();
  console.log(a);
} catch (error) {
  console.log(error.message);
}

// ssearchBooksByPublisher
try {
  const a = await searchBooksByPublisher("Skilith");
  console.log(a);
} catch (error) {
  console.log(error.message);
}

try {
  const a = await searchBooksByPublisher("foo bar"); // Throws Error
  console.log(a);
} catch (error) {
  console.log(error.message);
}
