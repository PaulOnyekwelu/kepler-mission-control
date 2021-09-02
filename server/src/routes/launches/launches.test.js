const request = require("supertest");
const app = require("../../app");

describe("GET /launches", () => {
  test("it should respond with 200 success", async () => {
    await request(app)
      .get("/launches")
      .expect("content-type", /json/)
      .expect(200);
  });
});

describe("POST /launches", () => {
  const requestBody = {
    launchDate: "January 2, 2030",
    mission: "Silcorp Exploration X",
    rocket: "Silcorp-X IS1",
    target: "kepler-SIL 34IE",
  };
  const requestBodyWithoutDate = {
    mission: "Silcorp Exploration X",
    rocket: "Silcorp-X IS1",
    target: "kepler-SIL 34IE",
  };

  test("it should respond with 201 created", async () => {
    const response = await request(app)
      .post("/launches")
      .send(requestBody)
      .expect("content-type", /json/)
      .expect(201);

    const requestLaunchDate = new Date(requestBody.launchDate).valueOf();
    const responseLaunchDate = new Date(response.body.launchDate).valueOf();

    expect(requestLaunchDate).toBe(responseLaunchDate);
    expect(response.body).toMatchObject(requestBodyWithoutDate);
  });

  test("it should catch missing required properties error", async () => {
    const response = await request(app)
      .post("/launches")
      .send(requestBodyWithoutDate)
      .expect("content-type", /json/)
      .expect(400);

    const expectedResponse = { error: "All fields are required" };

    expect(response.body).toStrictEqual(expectedResponse);
  });

  test("it should catch invalid dates", async () => {
    const response = await request(app)
      .post("/launches")
      .send({ ...requestBodyWithoutDate, launchDate: "hello" })
      .expect(400);

    expect(response.body).toStrictEqual({
      error: "invalid date",
    });
  });
});
