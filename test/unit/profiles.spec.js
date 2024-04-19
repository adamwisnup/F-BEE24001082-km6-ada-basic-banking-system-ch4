const {
  createProfile,
  findAllProfiles,
  findProfileById,
} = require("../../src/feature/profiles/data/query");

describe("Create Profile Test", () => {
  beforeEach(async () => {
    await prisma.profile.deleteMany();
  });

  const profileData = {
    user_id: 1,
    identity_type: "KTP",
    identity_number: "1234567890",
    address: "Jl. Jalan No. 1",
  };

  test("should create a new profile successfully", async () => {
    try {
      const result = await createProfile(profileData);

      expect(result).toHaveProperty("id");
      expect(result).toHaveProperty("identity_type", profileData.identity_type);
      expect(result).toHaveProperty(
        "identity_number",
        profileData.identity_number
      );
      expect(result).toHaveProperty("address", profileData.address);
    } catch (error) {
      throw error;
    }
  });

  // test("should handle create profile error when user not found", async () => {
  //   try {
  //     await createProfile({
  //       ...profileData,
  //       user_id: 999,
  //     });
  //   } catch (error) {
  //     expect(error.message).toBe("Profile created failed");
  //   }
  // });
});

describe("Find all profiles Test", () => {
  test("should find all profiles", async () => {
    try {
      const result = await findAllProfiles();
      expect(result).toBeInstanceOf(Array);
    } catch (error) {
      throw error;
    }
  });
});

describe("Find profile by id Test", () => {
  test("should find profile by id", async () => {
    try {
      const profileId = 12;
      const result = await findProfileById(profileId);

      expect(result).toHaveProperty("id", profileId);
      expect(result).toHaveProperty("user_id");
      expect(result).toHaveProperty("identity_type");
      expect(result).toHaveProperty("identity_number");
      expect(result).toHaveProperty("address");
    } catch (error) {
      throw error;
    }
  });

  test("should handle error when profile not found", async () => {
    try {
      const profileId = 999;
      await findProfileById(profileId);
    } catch (error) {
      expect(error.message).toBe("Profile not found");
    }
  });
});
