const app = require("../../src/index");
const request = require("supertest");

describe("GET /api/v1/users Test", () => {
  let token;

  beforeAll(async () => {
    try {
      const loginResponse = await request(app).post("/api/v1/auth/login").send({
        email: "user1@mail.com",
        password: "user123!",
      });

      token = loginResponse.body.data.token;
    } catch (error) {
      throw error;
    }
  });

  test("should get users successfully", async () => {
    try {
      const response = await request(app)
        .get("/api/v1/users")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("status", true);
      expect(response.body).toHaveProperty("data");
    } catch (error) {
      throw error;
    }
  });
});

describe("GET /api/v1/users/:id Test", () => {
  let token;

  beforeAll(async () => {
    try {
      const loginResponse = await request(app).post("/api/v1/auth/login").send({
        email: "user1@mail.com",
        password: "user123!",
      });

      token = loginResponse.body.data.token;
    } catch (error) {
      throw error;
    }
  });

  test("should get user by id successfully", async () => {
    try {
      const response = await request(app)
        .get("/api/v1/users/2")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("status", true);
      expect(response.body).toHaveProperty("data");
    } catch (error) {
      throw error;
    }
  });

  test("should handle error when user not found", async () => {
    try {
      const response = await request(app)
        .get("/api/v1/users/999")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("status", false);
      expect(response.body).toHaveProperty("message", "User not found");
      expect(response.body).toHaveProperty("data", null);
    } catch (error) {
      throw error;
    }
  });
});
