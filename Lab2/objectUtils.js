/* Todo: Implment the functions below and then export them
    using the ES6 exports syntax.
    DO NOT CHANGE THE FUNCTION NAMES
    */
import { isNumber, findMedian, findMode } from "./helpers.js";

let objectStats = (arrObjects) => {
  //Code goes here
  if (!arrObjects || !Array.isArray(arrObjects)) {
    throw Error("Input must be an array");
  }
  if (arrObjects.length === 0) {
    throw Error("Array must not be empty");
  }

  let values = [];

  for (let obj of arrObjects) {
    if (typeof obj !== "object" || obj === null || Array.isArray(obj)) {
      throw Error("Array must contain only objects");
    }
    if (Object.keys(obj).length === 0) {
      throw Error(
        "All objects in the array must have at least one key/value pair"
      );
    }
    for (let key in obj) {
      if (!isNumber(obj[key])) {
        throw Error("All object values must be numbers");
      }
      values.push(Math.round(obj[key] * 1000) / 1000);
    }
  }
  values.sort((a, b) => a - b);

  //sum
  let sum = 0;
  for (let value of values) {
    sum += value;
  }

  let mean = parseFloat((sum / values.length).toFixed(3));
  let median = findMedian(values);
  let mode = findMode(values);
  let min = values[0];
  let max = values[values.length - 1];
  let range = max - min;
  let count = values.length;
  let stats = {
    sum,
    count,
    mean,
    median,
    mode,
    min,
    max,
    range,
  };
  return stats;
};

let nestedObjectsDiff = (obj1, obj2) => {
  //Code goes here
  if (typeof obj1 !== "object" || typeof obj2 !== "object") {
    throw Error("Both inputs must be objects");
  }
  if (obj1 === null || obj2 === null) {
    throw Error("Both inputs must be objects");
  }
  if (Array.isArray(obj1) || Array.isArray(obj2)) {
    throw Error("Both inputs must be objects");
  }
  if (Object.keys(obj1).length === 0 || Object.keys(obj2).length === 0) {
    throw Error(
      "Both obj1 and obj2 must not be empty and must have at least one key/value pair."
    );
  }
  let diff = {};

  for (let key in obj2) {
    if (obj2.hasOwnProperty(key)) {
      if (
        obj1[key] &&
        typeof obj1[key] === "object" &&
        typeof obj2[key] === "object" &&
        !Array.isArray(obj1[key]) &&
        !Array.isArray(obj2[key])
      ) {
        let result = nestedObjectsDiff(obj1[key], obj2[key]);
        if (Object.keys(result).length !== 0) {
          diff[key] = result;
        }
      } else if (Array.isArray(obj1[key]) && Array.isArray(obj2[key])) {
        if (JSON.stringify(obj1[key]) !== JSON.stringify(obj2[key])) {
          diff[key] = obj2[key];
        }
      } else if (obj1[key] !== obj2[key]) {
        diff[key] = obj2[key];
      }
    }
  }

  for (let key in obj1) {
    if (obj1.hasOwnProperty(key) && !obj2.hasOwnProperty(key)) {
      diff[key] = undefined;
    }
  }

  return diff;
};

let mergeAndSumValues = (...args) => {
  //this function takes in a variable number of objects that's what the ...args signifies
  let result = {};
  for (let obj of args) {
    if (typeof obj !== "object" || Array.isArray(obj) || obj === null) {
      throw Error("All inputs should be non empty objects");
    }
    if (Object.keys(obj).length === 0) {
      throw Error("Each object has at least 1 key/value");
    }
    for (let key in obj) {
      let value = obj[key];
      if (typeof value === "string") {
        value = parseFloat(value);
        if (!isNumber(value)) {
          throw Error(
            "All values should be numbers or strings that can be converted to numbers"
          );
        }
      } else if (!isNumber(value)) {
        throw Error(
          "All values should be numbers or strings that can be converted to numbers"
        );
      }
      if (key in result) {
        result[key] += value;
      } else {
        result[key] = value;
      }
    }
  }
  return result;
};

export { objectStats, nestedObjectsDiff, mergeAndSumValues };
