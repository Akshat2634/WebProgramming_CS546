//import axios, md5
import axios from "axios";

export const searchMoviesByName = async (title) => {
  /*Function to make an axios call to search the api and return up to 20 movies matching the title param
  API endpoint: http://www.omdbapi.com/?apikey=CS546&s={title}
  */
  if (!title || typeof title !== "string" || title.trim().length === 0)
    throw Error("You must provide a title");
  const apiKey = "CS546";
  const url = `http://www.omdbapi.com/?apikey=${apiKey}&s=${title}`;

  const { data: data1 } = await axios.get(`${url}&page=1`);
  const { data: data2 } = await axios.get(`${url}&page=2`);

  // if (!Array.isArray(data1.Search) || !Array.isArray(data2.Search)) {
  //   throw Error(`No movies found with the provided title`);
  // }
  const movies = [...(data1.Search || []), ...(data2.Search || [])];
  // if (movies.length === 0) {
  //   throw Error(`No movies found with the provided title`);
  // }
  console.log(movies.length);
  return movies;
};

export const searchMovieById = async (id) => {
  /*Function to make an axios call to the the api matching the id
 API endpoint: http://www.omdbapi.com/?apikey=CS546&i={id}
  */
  const apiKey = "CS546";
  const url = `http://www.omdbapi.com/?apikey=${apiKey}&i=${id}`;
  const { data } = await axios.get(url);
  // if (!data || data.Response === "False") {
  //   throw Error(`Failed to fetch movie with id ${id}. Error: ${error.message}`);
  // }
  return data;
};
