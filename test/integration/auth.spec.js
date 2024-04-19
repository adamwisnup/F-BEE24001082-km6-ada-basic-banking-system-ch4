const app = require("../../src/index");
const request = require("supertest");

describe("POST /api/v1/register Tests", () => {
  test("should register a new user successfully", async () => {
    try {
      const userData = {
        email: "user5@mail.com",
        password: "user123!",
      };

      const response = await request(app)
        .post("POST /api/v1/auth/register")
        .send(userData);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("status", true);
      expect(response.body).toHaveProperty(
        "message",
        "User registered successfully"
      );
      expect(response.body.data).toHaveProperty("email", "user5@mail.com");
      expect(response.body.data).not.toHaveProperty("password");
    } catch (error) {
      throw error;
    }
  });

  test("should handle registration error when email already exists", async () => {
    try {
      const userData = {
        email: "user4@mail.com",
        password: "user123!",
      };
      const response = await request(app)
        .post("/api/v1/auth/register")
        .send(userData);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("status", false);
      expect(response.body).toHaveProperty("message", "Email already used");
      expect(response.body).toHaveProperty("data", null);
    } catch (error) {
      throw error;
    }
  });
});

describe("POST /api/v1/login Tests", () => {
  const userData = {
    email: "user1@mail.com",
    password: "user123!",
  };

  test("should login successfully", async () => {
    try {
      const response = await request(app)
        .post("/api/v1/auth/login")
        .send(userData);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("status", true);
      expect(response.body).toHaveProperty(
        "message",
        "User logged in successfully"
      );
      expect(response.body.data).toHaveProperty("token");
    } catch (error) {
      throw error;
    }
  });

  test("should handle login error when Invalid email or password", async () => {
    try {
      const response = await request(app).post("/api/v1/auth/login").send({
        email: "abcde@mail.com",
        password: "password123",
      });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("status", false);
      expect(response.body).toHaveProperty(
        "message",
        "Invalid email or password"
      );
      expect(response.body).toHaveProperty("data", null);
    } catch (error) {
      throw error;
    }
  });
});
