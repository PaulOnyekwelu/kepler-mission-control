const request = require("supertest");
const app = require("../../app");
const { mongoConnect, mongoDisconnect } = require("../../services/mongo");

describe("Launches API", () => {
  beforeAll(async () => {
    await mongoConnect();
  });

  afterAll(async () => {
    await mongoDisconnect();
  });

  describe("GET /launches", () => {
    test("it should respond with 200 success", async () => {
      await request(app)
        .get("/v1/launches")
        .expect("content-type", /json/)
        .expect(200);
    });
  });

  describe("POST /launches", () => {
    const requestBody = {
      launchDate: "January 2, 2030",
      mission: "Silcorp Exploration X",
      rocket: "Silcorp-X IS1",
      target: "Kepler-442 b",
    };
    const requestBodyWithoutDate = {
      mission: "Silcorp Exploration X",
      rocket: "Silcorp-X IS1",
      target: "Kepler-442 b",
    };

    test("it should respond with 201 created", async () => {
      await request(app)
        .post("/v1/launches")
        .send(requestBody)
        .expect("content-type", /json/)
        .expect(201);
    });

    test("it should catch missing required properties error", async () => {
      const response = await request(app)
        .post("/v1/launches")
        .send(requestBodyWithoutDate)
        .expect("content-type", /json/)
        .expect(400);

      const expectedResponse = { error: "All fields are required" };

      expect(response.body).toStrictEqual(expectedResponse);
    });

    test("it should catch invalid dates", async () => {
      const response = await request(app)
        .post("/v1/launches")
        .send({ ...requestBodyWithoutDate, launchDate: "hello" })
        .expect(400);

      expect(response.body).toStrictEqual({
        error: "invalid date",
      });
    });
  });
});
