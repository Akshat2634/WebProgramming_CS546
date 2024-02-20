export const questionOne = (index) => {
  // Implement question 1 here
  let num1 = 0,
    num2 = 1,
    nextTerm;

  if (index === 0) {
    return num1;
  } else if (index === 1) {
    return num2;
  }

  for (let i = 2; i <= index; i++) {
    nextTerm = num1 + num2;
    num1 = num2;
    num2 = nextTerm;
  }
  return num2; //return result
};

export const questionTwo = (arr) => {
  // Implement question 2 here
  const results = {};

  const isPrime = (num) => {
    if (num <= 1) {
      return false;
    }
    for (let i = 2; i < num; i++) {
      if (num % i == 0) {
        return false;
      }
    }
    return true;
  };

  if (arr && arr.length) {
    for (let i = 0; i < arr.length; i++) {
      results[arr[i]] = isPrime(arr[i]);
    }
  }

  return results; //return result
};

export const questionThree = (str) => {
  // Implement question 3 here
  const result = {
    consonants: 0,
    vowels: 0,
    numbers: 0,
    spaces: 0,
    punctuation: 0,
    specialCharacters: 0,
  };

  if (str === "") {
    return result;
  }

  // Function to count Consonants
  const consonantCount = (str) => {
    const consonantsArr = [
      "b",
      "c",
      "d",
      "f",
      "g",
      "h",
      "j",
      "k",
      "l",
      "m",
      "n",
      "p",
      "q",
      "r",
      "s",
      "t",
      "v",
      "w",
      "x",
      "y",
      "z",
    ];
    let count = 0;
    for (let i = 0; i < str.length; i++) {
      if (consonantsArr.includes(str[i].toLowerCase())) {
        count++;
      }
    }
    return count;
  };

  // Function for counting Vowels
  const vowelCount = (str) => {
    const vowelsArr = ["a", "e", "i", "o", "u"];
    let count = 0;

    for (let i = 0; i < str.length; i++) {
      if (vowelsArr.includes(str[i].toLowerCase())) {
        count++;
      }
    }
    return count;
  };

  // Function to count Numbers
  const numberCount = (str) => {
    const numbersArr = ["0", "1", "2", "3", "4", "5", "6", "7", "8"];
    let count = 0;
    for (let i = 0; i < str.length; i++) {
      if (numbersArr.includes(str[i])) {
        count++;
      }
    }
    return count;
  };

  // Function to count spaces
  const spaceCount = (str) => {
    let count = 0;
    for (let i = 0; i < str.length; i++) {
      if (str[i] === " ") {
        count++;
      }
    }
    return count;
  };

  // Function to count special characters
  const specialCharsCount = (str) => {
    const specialCharactersArr = [
      "+",
      "-",
      "/",
      "*",
      "%",
      "=",
      "[",
      "]",
      "{",
      "}",
      "(",
      ")",
      "$",
      "&",
      "^",
      "@",
      "#",
    ];
    let count = 0;
    for (let i = 0; i < str.length; i++) {
      if (specialCharactersArr.includes(str[i])) {
        count++;
      }
    }
    return count;
  };

  const punctuationCount = (str) => {
    const punctuationArr = ["!", "?", ".", ",", '"', ":", ";", ".", "'"];
    let count = 0;
    for (let i = 0; i < str.length; i++) {
      if (punctuationArr.includes(str[i])) {
        count++;
      }
    }
    return count;
  };

  result["consonants"] = consonantCount(str);
  result["vowels"] = vowelCount(str);
  result["numbers"] = numberCount(str);
  result["spaces"] = spaceCount(str);
  result["specialCharacters"] = specialCharsCount(str);
  result["punctuation"] = punctuationCount(str);

  return result; //return result
};

export const questionFour = (arr) => {
  // Implement question 4 here

  const result = [];

  if (arr.length === 0) {
    return result;
  }

  for (let i = 0; i < arr.length; i++) {
    let isUnique = arr[i];

    if (!result.includes(isUnique)) {
      result.push(arr[i]);
    }
  }

  return result; //return result
};

//DO NOT FORGET TO UPDATE THE INFORMATION BELOW OR IT WILL BE -2 POINTS PER FIELD THAT IS MISSING.
export const studentInfo = {
  firstName: "AKSHAT",
  lastName: "SAHU",
  studentId: "20022122",
};
