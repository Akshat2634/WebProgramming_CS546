//import express and express router as shown in lecture code and worked in previous labs.  Import your data functions from /data/movies.js that you will call in your routes below
import { searchMoviesByName, searchMovieById } from "../data/movies.js";
import { Router } from "express";
const router = Router();

router.route("/").get(async (req, res) => {
  //code here for GET will render the home handlebars file
  res.render("home", { page_title: "Movie Finder" });
});

router.route("/searchmovies").post(async (req, res) => {
  //code here for POST this is where your form will be submitting searchMoviesByName and then call your data function passing in the searchMoviesByName and then rendering the search results of up to 20 Movies.
  let title;
  try {
    title = req.body.searchMoviesByName;
    console.log(title);
    if (!title || typeof title !== "string" || title.trim().length === 0) {
      throw Error("You must provide a title");
    }
  } catch (e) {
    res.status(400).render("error", { error: e });
    return;
  }
  let movies;

  movies = await searchMoviesByName(title);
  if (movies.length === 0) {
    res.status(404).render("movieSearchResults", { title: title, movies: [] });
    return;
  }
  res.render("movieSearchResults", {
    movies: movies,
    title: title,
    page_title: "Movies Found",
  });
});

router.route("/movie/:id").get(async (req, res) => {
  //code here for GET a single movie\
  let id;
  try {
    id = req.params.id;
    if (!id) {
      throw Error("You must provide an id");
    }
  } catch (e) {
    res.status(400).render("error", { error: e });
    return;
  }
  let movie;
  try {
    movie = await searchMovieById(id);
    console.log(movie);
    if (movie.Response === "False") {
      throw Error(`No movie found with the provided id: ${id}`);
    }
  } catch (e) {
    res.status(404).render("error", { error: e });
    return;
  }
  return res.render("movieById", { movie: movie, page_title: movie.Title });
});

export default router;
