/* Todo: Implment the functions below and then export them
      using the ES6 exports syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/
import { palindrome, isogram } from "./helpers.js";

let swapChars = (string1, string2) => {
  //code goes here
  if (!string1 || !string2) {
    throw Error("Both strings are required");
  }
  if (typeof string1 !== "string" || typeof string2 !== "string") {
    throw Error("Both inputs should be strings");
  }

  string1 = string1.trim();
  string2 = string2.trim();

  if (string1.length < 4 || string2.length < 4) {
    throw Error("Both strings should have a minimum length of 4");
  }
  let swappedString1 = string2.slice(0, 4) + string1.slice(4);
  let swappedString2 = string1.slice(0, 4) + string2.slice(4);

  return swappedString1 + " " + swappedString2;
};

let longestCommonSubstring = (str1, str2) => {
  //code goes here
  if (!str1 || !str2) {
    throw Error("Both strings are required");
  }
  if (typeof str1 !== "string" || typeof str2 !== "string") {
    throw Error("Both inputs should be strings");
  }
  str1 = str1.trim();
  str2 = str2.trim();

  if (str1.length < 5 || str2.length < 5) {
    if (str1.length < 5) {
      throw Error("str1 should have a minimum length of 5 characters");
    }
    if (str2.length < 5) {
      throw Error("str2 should have a minimum length of 5 characters");
    }
  }
  let lcs = "";
  str1 = str1.toLowerCase();
  str2 = str2.toLowerCase();

  for (let i = 0; i < str1.length; i++) {
    for (let j = i + 1; j <= str1.length; j++) {
      let subString = str1.substring(i, j);
      if (str2.includes(subString) && subString.length > lcs.length) {
        lcs = subString;
      }
    }
  }
  return lcs;
};

let palindromeOrIsogram = (arrStrings) => {
  //code goes here
  if (!arrStrings) {
    throw Error("Array of strings is required");
  }
  if (!Array.isArray(arrStrings)) {
    throw Error("Input should be an array");
  }
  if (arrStrings.length < 2) {
    throw Error("Array should contain at least two strings");
  }

  for (let i = 0; i < arrStrings.length; i++) {
    arrStrings[i] = arrStrings[i].trim();
    if (typeof arrStrings[i] !== "string" || arrStrings[i] === "") {
      throw Error("All inputs should be non empty strings");
    }
  }
  let result = {};

  for (let i = 0; i < arrStrings.length; i++) {
    let str = arrStrings[i];
    if (palindrome(str) && isogram(str)) {
      // palidrome and isogram imported from helpers.js
      result[str] = "Both";
    } else if (palindrome(str)) {
      result[str] = "Palindrome";
    } else if (isogram(str)) {
      result[str] = "Isogram";
    } else {
      result[str] = "Neither";
    }
  }
  return result;
};

export { swapChars, longestCommonSubstring, palindromeOrIsogram };
