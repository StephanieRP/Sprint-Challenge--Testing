const request = require("supertest");
const server = require("./server.js");
const db = require("../../data/helpers/helpers.js");

describe("server", () => {
  describe("GET / request ", () => {
    it("should return 200 that able to get data", () => {
      return request(server)
        .get("/")
        .expect(200);
    });

    it("checking if database is using the async and await", async () => {
      const res = await request(server).get("/");
      expect(res.status).toBe(200);
    });

    it("should return JSON using done callback", done => {
      request(server)
        .get("/")
        .then(res => {
          expect(res.type).toBe("application/json");
          done();
        });
    });

    it('should return { api: "running" }', () => {
      const expected = { api: "running" };
      return request(server)
        .get("/")
        .then(res => {
          expect(res.body).toEqual(expected);
        });
    });
  });

  describe("POST /games ", () => {
    it("should return status code 201 when new game added", async () => {
      let res = await request(server)
        .post("/games")
        .send({ title: "Sorry", genre: "Boardgame" });
      expect(res.status).toBe(201);
    });

    it("should return status code 422 if incorrect data sent", async () => {
      let res = await request(server)
        .post("/games")
        .send({ genre: "Arcade" });
      expect(res.status).toBe(422);
    });

    it("should return the id of the added game", async () => {
      let res = await request(server)
        .post("/games")
        .send({ title: "Monopoly", genre: "Boardgame", releaseYear: 1980 });
      expect(res.body).toHaveLength(1);
    });

    it("adds new game to database", async () => {
      let res = await request(server)
        .post("/games")
        .send({ title: "BattleShip", genre: "Boardgame", releaseYear: 1970 });
      expect(res.body).toHaveLength(1);
    });
  });

  describe("Delete /", () => {
    it("should return 204 No Content, when deleting data", async () => {
      let res = await request(server).delete("/games/3");
      expect(res.status).toBe(204);
    });

    it("should return 404 if it does not exist, when deleting data", async () => {
      let res = await request(server).delete("/games/20");
      expect(res.status).toBe(404);
    });
  });
});
