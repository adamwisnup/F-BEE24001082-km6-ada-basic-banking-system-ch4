const app = require("../../src/index");
const request = require("supertest");

describe("POST /api/v1/accounts Tests", () => {
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

  test("should create a new bank account successfully", async () => {
    try {
      const response = await request(app)
        .post("/api/v1/accounts")
        .set("Authorization", `Bearer ${token}`)
        .send({
          user_id: 10,
          bank_name: "Bank A",
          bank_account_number: "12340987",
          balance: 100000,
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("status", true);
      expect(response.body).toHaveProperty(
        "message",
        "Bank account created successfully"
      );
      expect(response.body.data).toHaveProperty("user_id", 10);
      expect(response.body.data).toHaveProperty("bank_name", "Bank A");
      expect(response.body.data).toHaveProperty(
        "bank_account_number",
        "12340987"
      );
      expect(response.body.data).toHaveProperty("balance", 100000);
    } catch (error) {
      throw error;
    }
  });

  test("should handle error when bad request", async () => {
    try {
      const response = await request(app)
        .post("/api/v1/accounts")
        .set("Authorization", `Bearer ${token}`)
        .send({
          user_id: 999,
          account_number: "1234567890",
          balance: 1000000,
        });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("status", false);
      expect(response.body).toHaveProperty(
        "message",
        "Bank account created failed"
      );
      expect(response.body).toHaveProperty("data", null);
    } catch (error) {
      throw error;
    }
  });
});

describe("GET /api/v1/accounts Tests", () => {
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

  test("should get bank accounts successfully", async () => {
    try {
      const response = await request(app)
        .get("/api/v1/accounts")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("status", true);
      expect(response.body).toHaveProperty("data");
    } catch (error) {
      throw error;
    }
  });
});

describe("GET /api/v1/accounts/:id Test", () => {
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

  test("should get bank account by id successfully", async () => {
    try {
      const response = await request(app)
        .get("/api/v1/accounts/1")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("status", true);
      expect(response.body).toHaveProperty("data");
    } catch (error) {
      throw error;
    }
  });

  test("should handle error when bank account not found", async () => {
    try {
      const response = await request(app)
        .get("/api/v1/accounts/999")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("status", false);
      expect(response.body).toHaveProperty("message", "Bank account not found");
      expect(response.body).toHaveProperty("data", null);
    } catch (error) {
      throw error;
    }
  });
});
