const app = require("../../src/index");
const request = require("supertest");

describe("POST /api/v1/transactions Tests", () => {
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

  test("should create a new transaction successfully", async () => {
    try {
      const response = await request(app)
        .post("/api/v1/transactions")
        .set("Authorization", `Bearer ${token}`)
        .send({
          source_account_id: 2,
          destination_account_id: 1,
          amount: 750,
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("status", true);
      expect(response.body).toHaveProperty(
        "message",
        "Transaction created successfully"
      );
      expect(response.body.data).toHaveProperty("source_account_id", 2);
      expect(response.body.data).toHaveProperty("destination_account_id", 1);
      expect(response.body.data).toHaveProperty("amount", 750);
    } catch (error) {
      throw error;
    }
  });

  test("should handle error when bad request", async () => {
    try {
      const response = await request(app)
        .post("/api/v1/transactions")
        .set("Authorization", `Bearer ${token}`)
        .send({
          source_account_id: 999,
          destination_account_id: 988,
          amount: 10000,
        });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("status", false);
      expect(response.body).toHaveProperty(
        "message",
        "Transaction created failed"
      );
      expect(response.body).toHaveProperty("data", null);
    } catch (error) {
      throw error;
    }
  });
});

describe("GET /api/v1/transactions Tests", () => {
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

  test("should get transactions successfully", async () => {
    try {
      const response = await request(app)
        .get("/api/v1/transactions")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("status", true);
      expect(response.body).toHaveProperty("data");
    } catch (error) {
      throw error;
    }
  });
});

describe("GET /api/v1/transactions/:id Test", () => {
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

  test("should get transaction by id successfully", async () => {
    try {
      const response = await request(app)
        .get("/api/v1/transactions/1")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("status", true);
      expect(response.body).toHaveProperty("data");
    } catch (error) {
      throw error;
    }
  });

  test("should handle error when transaction not found", async () => {
    try {
      const response = await request(app)
        .get("/api/v1/transactions/999")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("status", false);
      expect(response.body).toHaveProperty("message", "Transaction not found");
      expect(response.body).toHaveProperty("data", null);
    } catch (error) {
      throw error;
    }
  });
});
