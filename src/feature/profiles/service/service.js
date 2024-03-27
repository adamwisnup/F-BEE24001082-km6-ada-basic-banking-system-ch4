const ProfilesQuery = require('../data/query');

class ProfilesService {
    async createProfile(data) {
        return await ProfilesQuery.createProfile(data);
    }

    async findAllProfiles() {
        return await ProfilesQuery.findAllProfiles();
    }

    async findProfileById(id) {
        return await ProfilesQuery.findProfileById(id);
    }
}

module.exports = new ProfilesService();