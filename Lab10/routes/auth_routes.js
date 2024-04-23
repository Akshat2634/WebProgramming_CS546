//import express, express router as shown in lecture code
import { registerUser, loginUser } from "../data/users.js";
import { Router } from "express";
const router = Router();

router.route("/").get(async (req, res) => {
  //code here for GET THIS ROUTE SHOULD NEVER FIRE BECAUSE OF MIDDLEWARE #1 IN SPECS.
  return res.json({ error: "YOU SHOULD NOT BE HERE!" });
});

router
  .route("/register")
  .get(async (req, res) => {
    //code here for GET
    return res.render("register");
  })
  .post(async (req, res) => {
    //code here for POST
    let {
      firstName,
      lastName,
      username,
      password,
      confirmPassword,
      favoriteQuote,
      themePreference,
      role,
    } = req.body;
    console.log(req.body);

    if (!firstName) {
      res.status(400).render("register", { error: "First name is missing" });
      return;
    }

    if (!lastName) {
      res.status(400).render("register", { error: "Last name is missing" });
      return;
    }

    if (!username) {
      res.status(400).render("register", { error: "Username is missing" });
      return;
    }

    if (!password) {
      res.status(400).render("register", { error: "Password is missing" });
      return;
    }

    if (!confirmPassword) {
      res
        .status(400)
        .render("register", { error: "Confirm password is missing" });
      return;
    }

    if (!favoriteQuote) {
      res
        .status(400)
        .render("register", { error: "Favorite quote is missing" });
      return;
    }

    if (!themePreference) {
      res
        .status(400)
        .render("register", { error: "Theme preference is missing" });
      return;
    }

    if (!role) {
      res.status(400).render("register", { error: "Role is missing" });
      return;
    }

      firstName = firstName.trim();
      lastName = lastName.trim();
      username = username.trim();
      // password = password.trim();
      favoriteQuote = favoriteQuote.trim();
      themePreference = themePreference.trim();
      role = role.trim();

    if (
      typeof firstName !== "string" ||
      firstName.trim().length === 0 ||
      /\d/.test(firstName) ||
      firstName.length < 2 ||
      firstName.length > 25 
    ) {
      res.status(400).render("register", { error: "Invalid first name" });
      return;
    }
    if (
      typeof lastName !== "string" ||
      lastName.trim().length === 0 ||
      /\d/.test(lastName) ||
      lastName.length < 2 ||
      lastName.length > 25 
    ) {
      res.status(400).render("register", { error: "Invalid last name" });
      return;
    }

    if (
      typeof username !== "string" ||
      username.trim().length === 0 ||
      /\d/.test(username) ||
      username.length < 5 ||
      username.length > 10
    ) {
      res.status(400).render("register", { error: "Invalid username" });
      return;
    }

    if (
      typeof password !== "string" ||
      password.trim().length === 0 ||
      password.includes(" ") ||
      password.length < 8 ||
      !/[A-Z]/.test(password) ||
      !/\d/.test(password) ||
      !/[!@#$%^&*]/.test(password)
    ) {
      res.status(400).render("register", { error: "Invalid password" });
      return;
    }

    if (password !== confirmPassword) {
      res.status(400).render("register", { error: "Passwords do not match" });
      return;
    }

    if (
      typeof favoriteQuote !== "string" ||
      favoriteQuote.trim().length === 0 ||
      favoriteQuote.length < 20 ||
      favoriteQuote.length > 255
    ) {
      res.status(400).render("register", { error: "Invalid favorite quote" });
      return;
    }

    if (themePreference !== "light" && themePreference !== "dark") {
      res.status(400).render("register", { error: "Invalid theme preference" });
      return;
    }

    if (role !== "admin" && role !== "user") {
      res.status(400).render("register", { error: "Invalid role" });
      return;
    }

    try {
      const newUser = await registerUser(
        firstName,
        lastName,
        username,
        password,
        favoriteQuote,
        themePreference,
        role
      );

      if (newUser.signupCompleted) {
        res.redirect("/login");
      } else {
        res.status(500).send({ error: "Internal Server Error" });
      }
    } catch (e) {
      console.log(e);
      res.status(400).render("register", { error: e.toString() });
    }
  });

router
  .route("/login")
  .get(async (req, res) => {
    //code here for GET
    return res.render("login");
  })
  .post(async (req, res) => {
    //code here for POST
    let { username, password } = req.body;

    if (!username) {
      res.status(400).render("login", { error: "Username is missing" });
      return;
    }

    if (!password) {
      res.status(400).render("login", { error: "Password is missing" });
      return;
    }

    username = username.toLowerCase();

    if (
      typeof username !== "string" ||
      username.trim().length === 0 ||
      username.length < 5 ||
      username.length > 10
    ) {
      res.status(400).render("login", { error: "Invalid username" });
      return;
    }

    if (
      typeof password !== "string" ||
      password.trim().length === 0 ||
      password.includes(" ") ||
      password.length < 8 ||
      !/[A-Z]/.test(password) ||
      !/\d/.test(password) ||
      !/[!@#$%^&*]/.test(password)
    ) {
      res.status(400).render("login", { error: "Invalid password" });
      return;
    }

    try {
      const user = await loginUser(username, password);

      if (user) {
        req.session.user = {
          firstName: user.firstName,
          lastName: user.lastName,
          username: user.username,
          favoriteQuote: user.favoriteQuote,
          themePreference: user.themePreference,
          role: user.role,
        };

        if (user.role === "admin") {
          res.redirect("/admin");
        } else {
          res.redirect("/user");
        }
      } else {
        res
          .status(400)
          .render("login", { error: "Invalid username or password" });
      }
    } catch (error) {
      res.status(400).render("login", { error: "Error logging in" });
    }
  });

router.route("/user").get(async (req, res) => {
  if (!req.session.user) {
    return res.status(403).send("Forbidden");
  }

  res.render("user", {
    firstName: req.session.user.firstName,
    lastName: req.session.user.lastName,
    currentTime: new Date().toLocaleTimeString(),
    role: req.session.user.role,
    favoriteQuote: req.session.user.favoriteQuote,
    isAdmin: req.session.user.role === "admin",
  });
});

router.route("/admin").get(async (req, res) => {
  //code here for GET
  if (!req.session.user || req.session.user.role !== "admin") {
    return res.status(403).render("error", {
      message: "You do not have permission to view this page",
    });
  }

  res.render("admin", {
    firstName: req.session.user.firstName,
    lastName: req.session.user.lastName,
    currentTime: new Date().toLocaleTimeString(),
    favoriteQuote: req.session.user.favoriteQuote,
  });
});

router.route("/logout").get(async (req, res) => {
  //code here for GET\
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send("Could not log out.");
    } else {
      return res.render("logout", { message: "You have been logged out." });
    }
  });
});

export default router;
