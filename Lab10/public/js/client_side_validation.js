// In this file, you must perform all client-side validation for every single form input (and the role dropdown) on your pages. The constraints for those fields are the same as they are for the data functions and routes. Using client-side JS, you will intercept the form's submit event when the form is submitted and If there is an error in the user's input or they are missing fields, you will not allow the form to submit to the server and will display an error on the page to the user informing them of what was incorrect or missing.  You must do this for ALL fields for the register form as well as the login form. If the form being submitted has all valid data, then you will allow it to submit to the server for processing. Don't forget to check that password and confirm password match on the registration form!

const signupForm = document.getElementById("signup-form");

if (signupForm) {
  signupForm.addEventListener("submit", function (event) {
    const oldErrors = document.querySelectorAll(".error");
    oldErrors.forEach((error) => error.remove());

    event.preventDefault();

    let firstName = document.getElementById("firstName").value;
    let lastName = document.getElementById("lastName").value;
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirmPassword").value;
    let favoriteQuote = document.getElementById("favoriteQuote").value;
    let themePreference = document.getElementById("themePreference").value;
    let role = document.getElementById("role").value;

    firstName = firstName.trim();
    lastName = lastName.trim();
    username = username.trim();
    // password = password.trim();
    favoriteQuote = favoriteQuote.trim();
    themePreference = themePreference.trim();
    role = role.trim();

    if (
      !firstName ||
      typeof firstName !== "string" ||
      firstName.trim().length === 0 ||
      firstName !== firstName.trim() ||
      firstName.trim().length < 2 ||
      firstName.trim().length > 25 || 
      Array.from(firstName).some(
        (char) => !isNaN(parseFloat(char)) && !isNaN(char - 0)
      ) 
    ) {
      const error = document.createElement("p");
      error.id = "error";
      error.className = "error";
      error.innerText =
        "First Name must be between 2 and 25 characters and cannot contain spaces";
      document.querySelector("#signup-form").appendChild(error);
      return;
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
      const error = document.createElement("p");
      error.id = "error";
      error.className = "error";
      error.innerText = "Last Name must be between 2 and 25 characters";
      document.querySelector("#signup-form").appendChild(error);
      return;
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
      ) || username.includes(" ")
    ) {
      const error = document.createElement("p");
      error.id = "error";
      error.className = "error";
      error.innerText =
        "Username must be between 5 and 10 characters and cannot contain spaces, numbers or special characters";
      document.querySelector("#signup-form").appendChild(error);
      return;
    }
    if (
      !password ||
      typeof password !== "string" ||
      password.trim().length === 0 ||
      password.includes(" ") ||
      password.length < 8 ||
      !/[A-Z]/.test(password) ||
      !/\d/.test(password) ||
      !/[!@#$%^&*]/.test(password)
    ) {
      const error = document.createElement("p");
      error.id = "error";
      error.className = "error";
      error.innerText =
        "Password must be at least 8 characters long and contain at least one uppercase letter, one number, and one special character";
      document.querySelector("#signup-form").appendChild(error);
      return;
    }
    if (password !== confirmPassword) {
      const error = document.createElement("p");
      error.id = "error";
      error.className = "error";
      error.innerText = "Passwords do not match";
      document.querySelector("#signup-form").appendChild(error);
      return;
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
      const error = document.createElement("p");
      error.id = "error";
      error.className = "error";
      error.innerText = "Favorite Quote must be between 20 and 255 characters";
      document.querySelector("#signup-form").appendChild(error);
      return;
    }
    themePreference = themePreference.toLowerCase();
    if (themePreference !== "light" && themePreference !== "dark") {
      const error = document.createElement("p");
      error.id = "error";
      error.className = "error";
      error.innerText = "Invalid theme preference";
      document.querySelector("#signup-form").appendChild(error);
      return;
    }
    if (role !== "user" && role !== "admin") {
      const error = document.createElement("p");
      error.id = "error";
      error.className = "error";
      error.innerText = "Invalid role";
      document.querySelector("#signup-form").appendChild(error);
      return;
    }
    this.submit();
  });
}

const signinForm = document.getElementById("signin-form");

if (signinForm) {
  signinForm.addEventListener("submit", function (event) {
    const oldErrors = document.querySelectorAll(".error");
    oldErrors.forEach((error) => error.remove());
    event.preventDefault();

    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    if (!username || !password) {
      const error = document.createElement("p");
      error.innerText = "Both fields are required";
      error.id = "error";
      error.className = "error";
      document.querySelector("#signin-form").appendChild(error);
      return;
    }
    if (
      typeof username !== "string" ||
      username.trim().length === 0 ||
      username !== username.trim() ||
      username.trim().length < 5 ||
      username.trim().length > 10 ||
      Array.from(username).some(
        (char) => !isNaN(parseFloat(char)) && !isNaN(char - 0)
      ) || username.includes(" ")
    ) {
      const error = document.createElement("p");
      error.id = "error";
      error.className = "error";
      error.innerText =
        "Username must be between 5 and 10 characters long and cannot contain spaces, numbers or special characters!";
      document.querySelector("#signin-form").appendChild(error);
      return;
    }
    for (let i = 0; i < username.length; i++) {
      if (!isNaN(username[i])) {
        const error = document.createElement("p");
        error.id = "error";
        error.innerText = "Username cannot contain numbers!";
        error.className = "error";
        document.querySelector("#signin-form").appendChild(error);
        return;
      }
    }
    if (
      !password ||
      typeof password !== "string" ||
      password.trim().length === 0 ||
      password.includes(" ") ||
      password.length < 8 ||
      !/[A-Z]/.test(password) ||
      !/\d/.test(password) ||
      !/[!@#$%^&*]/.test(password)
    ) {
      const error = document.createElement("p");
      error.id = "error";
      error.className = "error";
      error.innerText =
        "Password must be at least 8 characters long, contain at least one uppercase character, one number, and one special character!";
      document.querySelector("#signin-form").appendChild(error);
      return;
    }
    this.submit();
  });
}
