//import mongo collections, bcrypt and implement the following data functions
import { users } from "../config/mongoCollections.js";
import bcrypt from "bcrypt";
const saltRounds = 16;

export const registerUser = async (
  firstName,
  lastName,
  username,
  password,
  favoriteQuote,
  themePreference,
  role
) => {
  console.log("registerUser function called");

  console.log(
    firstName,
    lastName,
    username,
    password,
    favoriteQuote,
    themePreference,
    role
  );

  if (!firstName) {
    throw new Error(`Missing required field: firstName`);
  }

  if (!lastName) {
    throw new Error(`Missing required field: lastName`);
  }

  if (!username) {
    throw new Error(`Missing required field: username`);
  }

  if (!password) {
    throw new Error(`Missing required field: password`);
  }

  if (!favoriteQuote) {
    throw new Error(`Missing required field: favoriteQuote`);
  }

  if (!themePreference) {
    throw new Error(`Missing required field: themePreference`);
  }

  if (!role) {
    throw new Error(`Missing required field: role`);
  }

    firstName = firstName.trim();
    lastName = lastName.trim();
    username = username.trim();
    favoriteQuote = favoriteQuote.trim();
    themePreference = themePreference.trim();
    role = role.trim();
  if (
    typeof firstName !== "string" ||
    firstName.trim().length === 0 ||
    firstName !== firstName.trim() ||
    firstName.trim().length < 2 ||
    firstName.trim().length > 25 ||
    Array.from(firstName).some(
      (char) => !isNaN(parseFloat(char)) && !isNaN(char - 0)
    )
  ) {
    throw new Error("Invalid first name");
  }
  if (
    typeof lastName !== "string" ||
    lastName.trim().length === 0 ||
    lastName !== lastName.trim() ||
    lastName.trim().length < 2 ||
    lastName.trim().length > 25 ||
    Array.from(lastName).some(
      (char) => !isNaN(parseFloat(char)) && !isNaN(char - 0)
    )
  ) {
    throw new Error("Invalid last name");
  }

  username = username.toLowerCase();


  if (
    typeof username !== "string" ||
    username.trim().length === 0 ||
    username !== username.trim() ||
    username.trim().length < 5 ||
    username.trim().length > 10 ||
    Array.from(username).some(
      (char) => !isNaN(parseFloat(char)) && !isNaN(char - 0)
    )|| username.includes(" ")
  ) {
    throw new Error("Invalid username");
  }

  const usersCollection = await users();
  const existingUser = await usersCollection.findOne({ username: username });
  if (existingUser) {
    throw new Error("A user with this username already exists");
  }


  if (
    typeof password !== "string" ||
    password.trim().length === 0 ||
    password.includes(" ") ||
    password.length < 8 ||
    !password
      .split("")
      .some(
        (char) => char === char.toUpperCase() && char !== char.toLowerCase()
      ) ||
    !password
      .split("")
      .some((char) => !isNaN(parseFloat(char)) && !isNaN(char - 0)) ||
    !password
      .split("")
      .some((char) =>
        [
          "!",
          "@",
          "#",
          "$",
          "%",
          "^",
          "&",
          "*",
          "(",
          ")",
          ",",
          ".",
          "?",
          ":",
          "{",
          "}",
          "|",
          "<",
          ">",
        ].includes(char)
      )
  ) {
    throw new Error("Invalid password");
  }

  const hasUppercase = (str) => str.toLowerCase() !== str;
  const hasNumber = (str) => Array.from(str).some((char) => !isNaN(char));
  const hasSpecialChar = (str) =>
    Array.from(str).some((char) =>
      [
        "!",
        "@",
        "#",
        "$",
        "%",
        "^",
        "&",
        "*",
        "(",
        ")",
        ",",
        ".",
        "?",
        ":",
        "{",
        "}",
        "|",
        "<",
        ">",
      ].includes(char)
    );

  if (
    typeof password !== "string" ||
    password.trim().length === 0 ||
    password.includes(" ") ||
    password.length < 8 ||
    !hasUppercase(password) ||
    !hasNumber(password) ||
    !hasSpecialChar(password)
  ) {
    throw new Error("Invalid password");
  }
  if (
    typeof favoriteQuote !== "string" ||
    favoriteQuote.trim().length === 0 ||
    favoriteQuote !== favoriteQuote.trim() ||
    favoriteQuote.trim().length < 20 ||
    favoriteQuote.trim().length > 255 ||
    Array.from(favoriteQuote).some(
      (char) => !isNaN(parseFloat(char)) && !isNaN(char - 0)
    )
  ) {
    throw new Error("Invalid favorite quote");
  }

  themePreference = themePreference.toLowerCase();

  if (themePreference !== "light" && themePreference !== "dark") {
    throw new Error("Invalid theme preference");
  }

  if (role !== "admin" && role !== "user") {
    throw new Error("Invalid role");
  }


 
  password = password.trim();
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const newUser = {
    firstName: firstName,
    lastName: lastName,
    username: username,
    password: hashedPassword,
    favoriteQuote: favoriteQuote,
    themePreference: themePreference,
    role: role,
  };

  const insertInfo = await usersCollection.insertOne(newUser);

  if (insertInfo.insertedCount === 0) {
    throw new Error("Could not add user");
  }

  return { signupCompleted: true };
};

export const loginUser = async (username, password) => {
  console.log("loginUser function called");
  if (!username || !password) {
    throw new Error("Missing required fields");
  }

  username = username.toLowerCase();

  if (
    typeof username !== "string" ||
    username.trim().length === 0 ||
    username !== username.trim() ||
    username.trim().length < 5 ||
    username.trim().length > 10 ||
    Array.from(username).some(
      (char) => !isNaN(parseFloat(char)) && !isNaN(char - 0)
    )
  ) {
    throw new Error("Invalid username");
  }

  if (
    typeof password !== "string" ||
    password.trim().length === 0 ||
    password.includes(" ") ||
    password.length < 8 ||
    !password
      .split("")
      .some(
        (char) => char === char.toUpperCase() && char !== char.toLowerCase()
      ) ||
    !password
      .split("")
      .some((char) => !isNaN(parseFloat(char)) && !isNaN(char - 0)) ||
    !password
      .split("")
      .some((char) =>
        [
          "!",
          "@",
          "#",
          "$",
          "%",
          "^",
          "&",
          "*",
          "(",
          ")",
          ",",
          ".",
          "?",
          ":",
          "{",
          "}",
          "|",
          "<",
          ">",
        ].includes(char)
      )
  ) {
    throw new Error("Invalid password");
  }

  const hasUppercase = (str) => str.toLowerCase() !== str;
  const hasNumber = (str) => Array.from(str).some((char) => !isNaN(char));
  const hasSpecialChar = (str) =>
    Array.from(str).some((char) =>
      [
        "!",
        "@",
        "#",
        "$",
        "%",
        "^",
        "&",
        "*",
        "(",
        ")",
        ",",
        ".",
        "?",
        ":",
        "{",
        "}",
        "|",
        "<",
        ">",
      ].includes(char)
    );

  if (
    typeof password !== "string" ||
    password.trim().length === 0 ||
    password.includes(" ") ||
    password.length < 8 ||
    !hasUppercase(password) ||
    !hasNumber(password) ||
    !hasSpecialChar(password)
  ) {
    throw new Error("Invalid password");
  }

  const usersCollection = await users();

  const existingUser = await usersCollection.findOne({ username: username });

  if (!existingUser) {
    throw new Error("Either the username or password is invalid");
  }

  const isPasswordMatch = await bcrypt.compare(password, existingUser.password);
  if (!isPasswordMatch) {
    throw new Error("Either the username or password is invalid");
  }

  return {
    firstName: existingUser.firstName,
    lastName: existingUser.lastName,
    favoriteQuote: existingUser.favoriteQuote,
    themePreference: existingUser.themePreference,
    role: existingUser.role,
  };
};
