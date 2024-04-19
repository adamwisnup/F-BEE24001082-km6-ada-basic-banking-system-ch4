const prisma = require("../../../config/config");

class ProfilesQuery {
  async createProfile(data) {
    return await prisma.profile.create({
      data: {
        user: {
          connect: { id: data.user_id },
        },
        identity_type: data.identity_type,
        identity_number: data.identity_number,
        address: data.address,
      },
    });
  }

  async findAllProfiles() {
    return await prisma.profile.findMany();
  }

  async findProfileById(id) {
    return await prisma.profile.findUnique({ where: { id: parseInt(id) } });
  }
}

module.exports = new ProfilesQuery();
