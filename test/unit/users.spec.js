const {
  findAllUsers,
  findUserById,
} = require("../../src/feature/users/data/query");

describe("Find all users Test", () => {
  test("should find all users", async () => {
    try {
      const result = await findAllUsers();
      expect(result).toBeInstanceOf(Array);
    } catch (error) {
      throw error;
    }
  });
});

describe("Find user by id Test", () => {
  test("should find user by id", async () => {
    try {
      const userId = 1;
      const result = await findUserById(userId);

      expect(result).toHaveProperty("id", userId);
      expect(result).toHaveProperty("email");
      expect(result).toHaveProperty("password");
    } catch (error) {
      throw error;
    }
  });

  test("should handle error when user not found", async () => {
    try {
      const userId = 999;
      await findUserById(userId);
    } catch (error) {
      expect(error.message).toBe("User not found");
    }
  });
});
