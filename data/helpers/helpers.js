const db = require("../dbConfig.js");

module.exports = {
  addGame,
  getGames,
  removeGame
};

////********//////
// Post Request
////********//////

function addGame(game) {
  return db("games").insert(game);
}

////********//////
// Get Request
////********//////

function getGames(game) {
  return db("games");
}

////********//////
// Delete Request
////********//////

function removeGame(id) {
  return db("games")
    .where({ id })
    .del();
}
