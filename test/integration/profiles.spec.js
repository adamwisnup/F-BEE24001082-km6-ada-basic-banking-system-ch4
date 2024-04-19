const app = require("../../src/index");
const request = require("supertest");

describe("POST /api/v1/profiles Tests", () => {
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

  test("should create a new profile successfully", async () => {
    try {
      const response = await request(app)
        .post("/api/v1/profiles")
        .set("Authorization", `Bearer ${token}`)
        .send({
          user_id: 3,
          identity_type: "SIM C",
          identity_number: "83274322",
          address: "Jalan Contoh No. 3",
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("status", true);
      expect(response.body).toHaveProperty(
        "message",
        "Profile created successfully"
      );
      expect(response.body.data).toHaveProperty("user_id", 3);
      expect(response.body.data).toHaveProperty("identity_type", "SIM C");
      expect(response.body.data).toHaveProperty("identity_number", "83274322");
      expect(response.body.data).toHaveProperty(
        "address",
        "Jalan Contoh No. 3"
      );
    } catch (error) {
      throw error;
    }
  });

  test("should handle error when bad request", async () => {
    try {
      const response = await request(app)
        .post("/api/v1/profiles")
        .set("Authorization", `Bearer ${token}`)
        .send({
          user_id: 999,
          identity_type: "SIM C",
          identity_number: "83274322",
          address: "Jalan Contoh No. 3",
        });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("status", false);
      expect(response.body).toHaveProperty("message", "Profile created failed");
      expect(response.body).toHaveProperty("data", null);
    } catch (error) {
      throw error;
    }
  });
});

describe("GET /api/v1/profiles Tests", () => {
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

  test("should get profiles successfully", async () => {
    try {
      const response = await request(app)
        .get("/api/v1/profiles")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("status", true);
      expect(response.body).toHaveProperty("data");
    } catch (error) {
      throw error;
    }
  });
});

describe("GET /api/v1/profiles/:id Test", () => {
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

  test("should get profile by id successfully", async () => {
    try {
      const response = await request(app)
        .get("/api/v1/profiles/1")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("status", true);
      expect(response.body).toHaveProperty("data");
    } catch (error) {
      throw error;
    }
  });

  test("should handle error when profile not found", async () => {
    try {
      const response = await request(app)
        .get("/api/v1/profiles/999")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("status", false);
      expect(response.body).toHaveProperty("message", "Profile not found");
      expect(response.body).toHaveProperty("data", null);
    } catch (error) {
      throw error;
    }
  });
});
