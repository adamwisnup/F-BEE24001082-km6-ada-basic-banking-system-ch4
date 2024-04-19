const { register, login } = require("../../src/feature/auth/data/query");

describe("Register Test", () => {
  const userData = {
    email: "user1@mail.com",
    password: "user123!",
  };

  test("should register a new user successfully", async () => {
    try {
      const result = await register(userData);

      expect(result).toHaveProperty("email", userData.email);
      expect(result).not.toHaveProperty("password");
    } catch (error) {
      throw error;
    }
  });

  test("should handle registration error when email already exists", async () => {
    try {
      await register(userData);
    } catch (error) {
      expect(error.message).toBe("Email already used");
    }
  });
});

describe("Login Test", () => {
  test("should login successfully", async () => {
    try {
      const userData = {
        email: "user1@mail.com",
        password: "user123!",
      };

      const result = await login(userData);

      expect(result).toHaveProperty("token");
    } catch (error) {
      throw error;
    }
  });

  test("should handle login error when Invalid email or password", async () => {
    try {
      const userData = {
        email: "user2@mail.com",
        password: "user123!",
      };
      await login(userData);
    } catch (error) {
      expect(error.message).toBe("Invalid email or password");
    }
  });
});
