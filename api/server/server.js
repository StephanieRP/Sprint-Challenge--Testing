const express = require("express");
const db = require("../../data/helpers/helpers.js");
const server = express();

server.use(express.json());

server.get("/", async (req, res) => {
  res.status(200).json({ api: "running" });
});

server.get("/games", async (req, res) => {
  const games = await db.getGames();

  res.status(200).json(games);
});

//Post request to add new game --> /games
server.post("/games", async (req, res) => {
  const { body } = req;
  try {
    const game = await db.addGame(body);
    res.status(201).json(game);
    console.log(game);
  } catch (error) {
    res.status(422).json({ message: "Please add either title or genre." });
  }
});

// Delete request to delete a game --> /:id
server.delete("/games/:id", async (req, res) => {
  try {
    const game = await db.removeGame(req.params.id);
    game > 0
      ? res.status(204).end()
      : res.status(404).json({
          message: "The game with the specified ID does not exist."
        });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "The game could not be removed"
    });
  }
});

module.exports = server;
