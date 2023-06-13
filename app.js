require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.APP_PORT;

app.use(express.json());

const { validateMovie, validateUser } = require("./validators.js");
const movieHandlers = require("./moviesHandlers");

app.delete("/api/movies/:id", movieHandlers.deleteMovie);
app.post("/api/movies", validateMovie, movieHandlers.postMovie);
app.put("/api/movies/:id", validateMovie, movieHandlers.updateMovie);
app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);

const usersHandlers = require("./usersHandlers");

app.get("/api/users", usersHandlers.getUsers);
app.get("/api/users/:id", usersHandlers.getUsersById);
app.put("/api/users/:id", validateUser, usersHandlers.updateUsers);
app.post("/api/users", validateUser, usersHandlers.postUser);

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }

  const welcome = (req, res) => {
    res.send("Welcome to my favourite users list");
  };

  app.get("/", welcome);
});
