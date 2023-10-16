const { User } = require("../../models");
const { sequelize } = require("../../models");

describe("User model tests", () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  test("Create a user", async () => {
    const user = await User.create({
      firstName: "John",
      lastName: "Doe",
      email: "test@test.com",
    });
    expect(user.firstName).toBe("John");
  });

  test("Update a user", async () => {
    const newUser = await User.create({
      firstName: "Jane",
      lastName: "Smith",
      email: "jane@test.com",
    });
    await newUser.update({ lastName: "Doe" });
    const updatedUser = await User.findByPk(newUser.id);
    expect(updatedUser.lastName).toBe("Doe");
  });

  test("Get all users", async () => {
    await User.create({
      firstName: "User1",
      lastName: "One",
      email: "user1@test.com",
    });
    await User.create({
      firstName: "User2",
      lastName: "Two",
      email: "user2@test.com",
    });
    const users = await User.findAll();

    expect(users.length).toBe(4); // Including the John Doe user created in the first test
    expect(users.map((user) => user.firstName)).toEqual(
      expect.arrayContaining(["User1", "User2", "John"]),
    );
  });

  afterAll(async () => {
    await sequelize.close();
  });
});
