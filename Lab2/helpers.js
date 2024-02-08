/* Todo: Implment any helper functions below 
    and then export them for use in your other files.
*/

function isNumber(value) {
  return typeof value === "number" && !isNaN(value);
}

function findMedian(arr) {
  arr.sort((a, b) => a - b);
  const middleIndex = Math.floor(arr.length / 2);

  if (arr.length % 2 === 0) {
    return (arr[middleIndex - 1] + arr[middleIndex]) / 2;
  } else {
    return arr[middleIndex];
  }
}

function findMode(arr) {
  let frequency = {};
  let max = 0;
  let modes = [];

  for (let num of arr) {
    if (!frequency[num]) {
      frequency[num] = 1;
    } else {
      frequency[num]++;
    }

    if (frequency[num] > max) {
      max = frequency[num];
      modes = [num];
    } else if (frequency[num] === max) {
      modes.push(num);
    }
  }

  if (modes.length === 1) {
    return modes[0];
  } else if (modes.length > 1) {
    return modes.sort((a, b) => a - b);
  } else {
    return 0;
  }
}

function palindrome(str) {
  str = str.toLowerCase();

  let charArray = str.split("");

  let alphanumericArray = charArray.filter(
    (c) => (c >= "a" && c <= "z") || (c >= "0" && c <= "9")
  );

  str = alphanumericArray.join("");
  let len = str.length;
  for (let i = 0; i < len / 2; i++) {
    if (str[i] !== str[len - 1 - i]) {
      return false;
    }
  }
  return true;
}

function isogram(str) {
  let alphabeticStr = "";
  for (let i = 0; i < str.length; i++) {
    let char = str[i].toLowerCase();
    if ((char >= "a" && char <= "z") || (char >= "0" && char <= "9")) {
      alphabeticStr += str[i];
    }
  }

  let strArr = alphabeticStr.toLowerCase().split("").sort();
  for (let i = 0; i < strArr.length; i++) {
    if (strArr[i] === strArr[i + 1]) {
      return false;
    }
  }
  return true;
}

export { palindrome, isogram, findMedian, findMode, isNumber };
