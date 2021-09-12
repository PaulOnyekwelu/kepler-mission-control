const request = require("supertest");
const app = require("../../app");
const { mongoConnect, mongoDisconnect } = require("../../services/mongo");

describe("Planets routes", () => {
  beforeAll(async () => {
    await mongoConnect();
  });
  afterAll(async () => {
    await mongoDisconnect();
  });

  describe("GET /v1/planets", () => {
    test("it should get all Planets", async () => {
      const resp = await request(app)
        .get("/v1/planets")
        .expect("content-type", /json/)
        .expect(200);
    });
  });
});
