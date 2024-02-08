/* TODO: Import the functions from your three modules here and write two test cases for each function.. You should have a total of 18 test cases. 
do not forget that you need to create the package.json and add the start command to run app.js as the starting script*/
import { arrayPartition, arrayShift, matrixOne } from "./arrayUtils.js";
import {
  swapChars,
  longestCommonSubstring,
  palindromeOrIsogram,
} from "./stringUtils.js";
import {
  objectStats,
  nestedObjectsDiff,
  mergeAndSumValues,
} from "./objectUtils.js";

//arrayUtils.js

// arrayPartition

try {
  const arrayToPartition1 = [1, 2, 3, 4, 5];
  const partitionFunc1 = (num) => num % 2 === 0;
  const partitionedArrays1 = arrayPartition(arrayToPartition1, partitionFunc1); // Expected Result: [[2, 4], [1, 3, 5]]
  console.log(partitionedArrays1);
} catch (error) {
  console.error("An error occurred:", error.message);
}

try {
  const arrayToPartition2 = [1, 2, 3, 4, 5];
  const partitionFunc2 = "not a function";
  const partitionedArrays2 = arrayPartition(arrayToPartition2, partitionFunc2); // Expected Result: Error: partitionFunc is not a function
  console.log(partitionedArrays2);
} catch (error) {
  console.error("An error occurred:", error.message);
}

//arrayShift
try {
  console.log(arrayShift([1, 2, 3, 4], -2)); // returns [3,4,1,2]
} catch (error) {
  console.error("An error occurred:", error.message);
}

try {
  console.log(arrayShift([7, 11, 15], 3.5)); // An error occurred: n must be an integer
} catch (error) {
  console.log("An error occurred:", error.message);
}

//matrixOne
try {
  console.log(
    matrixOne([
      [0, 1, 2, 0],
      [3, 5, 4, 2],
      [1, 7, 3, 5],
    ])
  );
} catch (error) {
  console.log("An error occurred:", error.message);
} //returns [[1,1,1,1],[1,5,4,1],[1,7,3,1]]

try {
  console.log(
    matrixOne([
      [0, 1, 2, 0],
      [3, 5, 4],
    ])
  );
} catch (error) {
  console.log("An error occurred:", error.message);
} /// An error occurred: All rows in matrix must have the same number of elements

//stringUtils.js

//swapChars
try {
  console.log(swapChars("Patrick", "Hill")); //Returns "Hillick Patr"
} catch (error) {
  console.log("An error occurred:", error.message);
}

try {
  console.log(swapChars(" ", "world")); //An error occurred: Both strings should have a minimum length of 4
} catch (error) {
  console.log("An error occurred:", error.message);
}

// longestCommonSubstring;

try {
  const str1 = "abcdxyz";
  const str2 = "xyzABCD";
  const commonSubstring = longestCommonSubstring(str1, str2);
  console.log(commonSubstring); // Expected Result: "abcd"
} catch (error) {
  console.error("An error occurred:", error.message);
}

try {
  const str3 = 1;
  const str4 = "programmer";
  const commonSubstring = longestCommonSubstring(str3, str4);
  console.log(commonSubstring); // An error occurred: Both inputs should be strings
} catch (error) {
  console.error("An error occurred:", error.message);
}

//palindromeOrIsogram

try {
  const checkStrings = [
    "Madam",
    "Lumberjack",
    "He did, eh?",
    "Background",
    "Taco cat? Taco cat.",
    "Invalid String",
  ];
  const results = palindromeOrIsogram(checkStrings);
  console.log(results);
} catch (error) {
  console.error("An error occurred:", error.message);
}
//returns and then logs:
// { "Madam": "Palindrome", "Lumberjack": "Isogram", "He did, eh?": "Palindrome", "Background": "Isogram", "Taco cat? Taco cat.": "Palindrome", "Invalid String": "Neither" }

try {
  const strings1 = ["level", "", "Palindrome", "Isogram"];
  const results1 = palindromeOrIsogram(strings1);
  console.log(results1);
} catch (error) {
  console.error("An error occurred:", error.message);
}
//returns and then outputs:
// an error occurred: All inputs should be non empty strings

// objectUtils.js
//objectStats

try {
  const arrayOfObjects1 = [
    { a: 12, b: 8, c: 15, d: 12, e: 10, f: 15 },
    { x: 5, y: 10, z: 15 },
    { p: -2, q: 10, r: 5, s: 3.5 },
  ];
  const statsResult1 = objectStats(arrayOfObjects1);
  console.log(statsResult1);
} catch (error) {
  console.error("An error occurred:", error.message);
}
// Expected Result:{sum: 118.5, count: 13, mean: 9.115, median: 10, mode: [ 10, 15 ], min: -2, max: 15, range: 17}

try {
  const arrayOfObjects2 = [{}, { x: -5, y: 8, z: 10 }, { a: 5, b: 5, c: 5 }];
  const statsResult2 = objectStats(arrayOfObjects2);
  console.log(statsResult2);
} catch (error) {
  console.error("An error occurred:", error.message);
}
// An error occurred: All objects in the array must have at least one key/value pair

//nestedObjectsDiff

try {
  const obj1 = {
    key1: "value1",
    key2: { nestedKey: "nestedValue", arrayKey: [1, 2, 3] },
  };
  const obj2 = {
    key1: "value1",
    key2: { nestedKey: "differentValue", arrayKey: [1, 2, 4] },
    key3: "newKey",
  };
  const differences = nestedObjectsDiff(obj1, obj2);
  console.log(differences);
} catch (error) {
  console.error("An error occurred:", error.message);
}
// Example Output:   { key2: { nestedKey: "differentValue", arrayKey: [1, 2, 4], }, key3: "newKey" }

try {
  const obj3 = { x: { y: { z: 1 } } };
  const obj4 = { x: { y: {} } };
  const differences2 = nestedObjectsDiff(obj3, obj4);
  console.log(differences2);
} catch (error) {
  console.error("An error occurred:", error.message);
}
// An error occurred: Both obj1 and obj2 must not be empty and must have at least one key/value pair.

// mergeAndSumValues

try {
  const object1 = { a: 3, b: 7, c: "5" };
  const object2 = { b: 2, c: "8", d: "4" };
  const object3 = { a: 5, c: 3, e: 6 };
  const resultMergedAndSummed = mergeAndSumValues(object1, object2, object3);
  console.log(resultMergedAndSummed);
} catch (error) {
  console.error("An error occurred:", error.message);
}
// Expected Result: { a: 8, b: 9, c: 16, d: 4, e: 6 }

try {
  const obj4 = { a: 1, b: "2", c: 3 };
  const obj5 = { b: 3, c: 4, d: 5 };
  const obj6 = { a: 2, c: "hello", e: 6 };
  const result4 = mergeAndSumValues(obj4, obj5, obj6);
  console.log(result4);
} catch (error) {
  console.error("An error occurred:", error.message);
} // Throws an error : All values should be numbers or strings that can be converted to numbers
