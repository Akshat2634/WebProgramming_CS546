/* Todo: Implment the functions below and then export them
      using the ES6 exports syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/

let arrayPartition = (arrayToPartition, partitionFunc) => {
  //code goes here
  if (arrayToPartition === undefined) {
    throw Error(" arrayToPartition is undefined");
  }
  if (!Array.isArray(arrayToPartition)) {
    throw Error(" arrayToPartition must be an array");
  }
  if (arrayToPartition.length === 0) {
    throw Error(" arrayToPartition is empty");
  }

  if (arrayToPartition.length < 2) {
    throw Error(" arrayToPartition must have atleast 2 elements");
  }

  if (typeof partitionFunc !== "function") {
    throw Error(" partitionFunc is not a function");
  }

  let arrTrue = [];
  let arrFalse = [];

  for (let i = 0; i < arrayToPartition.length; i++) {
    if (arrayToPartition[i] === undefined || arrayToPartition[i] === null) {
      throw Error("An element in arrayToPartition is undefined");
    }
    let partitionResult = partitionFunc(arrayToPartition[i]);
    if (typeof partitionResult !== "boolean") {
      throw Error("partitionFunc must return a boolean");
    }
    if (partitionResult) {
      arrTrue.push(arrayToPartition[i]);
    } else {
      arrFalse.push(arrayToPartition[i]);
    }
  }
  return [arrTrue, arrFalse];
};

let arrayShift = (arr, n) => {
  //code goes here
  if (arr === undefined) {
    throw Error("arr is undefined");
  }
  if (!Array.isArray(arr)) {
    throw Error("arr must be an array");
  }
  if (arr.length < 2) {
    throw Error("arr must have atleast 2 elements");
  }

  if (n === undefined) {
    throw Error("n is undefined");
  }
  if (typeof n !== "number") {
    throw Error("n must be a number");
  }
  if (!Number.isInteger(n)) {
    throw Error("n must be an integer");
  }
  let length = arr.length;
  n = n % length;
  if (n < 0) {
    n = n + length;
  }
  let arr1 = arr.slice(0, -n);
  let arr2 = arr.slice(-n);
  return arr2.concat(arr1);
};

let matrixOne = (matrix) => {
  //code goes here
  if (matrix === undefined) {
    throw Error("matrix is undefined");
  }
  if (!Array.isArray(matrix)) {
    throw Error("matrix must be an array");
  }
  if (matrix.length === 0) {
    throw Error("matrix is empty");
  }
  for (let i = 0; i < matrix.length; i++) {
    if (!Array.isArray(matrix[i])) {
      throw new Error("Each row in matrix must be an array");
    }
    if (matrix[i].length === 0) {
      throw new Error("Each row in matrix must be a non-empty array");
    }
    for (let j = 0; j < matrix[i].length; j++) {
      if (typeof matrix[i][j] !== "number") {
        throw new Error("Each element in matrix must be a number");
      }
    }
  }
  let rowLength = matrix[0].length;

  for (let i = 1; i < matrix.length; i++) {
    if (matrix[i].length !== rowLength) {
      throw new Error(
        "All rows in matrix must have the same number of elements"
      );
    }
  }

  let zeroPositions = [];

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] === 0) {
        zeroPositions.push([i, j]);
      }
    }
  }

  for (let position of zeroPositions) {
    let [row, col] = position;

    for (let j = 0; j < matrix[row].length; j++) {
      matrix[row][j] = 1;
    }

    for (let i = 0; i < matrix.length; i++) {
      matrix[i][col] = 1;
    }
  }

  return matrix;
};

export { arrayPartition, arrayShift, matrixOne };
