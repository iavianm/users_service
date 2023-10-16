const request = require("supertest");
const app = require("../../server");

describe("User API tests", () => {
  let createdUserId;

  test("Don't create a user without email", async () => {
    const response = await request(app)
      .post("/users")
      .send({ firstName: "John", lastName: "Doe" });

    expect(response.status).toBe(400);
    expect(response.body.validation.body.message).toContain(
      '"email" is required',
    );
  });

  test("Create a user", async () => {
    const response = await request(app).post("/users").send({
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@test.com",
    });

    expect(response.status).toBe(201);
    expect(response.body.firstName).toBe("John");
    expect(response.body.lastName).toBe("Doe");
    expect(response.body.email).toBe("john.doe@test.com");

    createdUserId = response.body.id;
  });

  test("Update a user", async () => {
    const response = await request(app).put(`/users/${createdUserId}`).send({
      firstName: "Jane",
    });

    expect(response.status).toBe(200);
    expect(response.body.firstName).toBe("Jane");
    expect(response.body.lastName).toBe("Doe");
  });

  test("Attempt to update a user with invalid ID", async () => {
    const invalidUserId = "someinvalidid12345";
    const response = await request(app).put(`/users/${invalidUserId}`).send({
      firstName: "Jane",
    });

    expect(response.status).toBe(400);
    expect(response.body.validation.params.message).toContain(
      '"id" must be a number',
    );
  });

  test("Get all users", async () => {
    const response = await request(app).get("/users");

    expect(response.status).toBe(200);
    const users = response.body;

    expect(
      users.some(
        (user) => user.firstName === "Jane" && user.lastName === "Doe",
      ),
    ).toBeTruthy();
  });

  afterAll((done) => {
    app.close(done);
  });
});
