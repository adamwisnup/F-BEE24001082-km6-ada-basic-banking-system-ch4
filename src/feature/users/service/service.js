const UsersQuery = require('../data/query');

class UsersService {
    async createUser(data) {
        return await UsersQuery.createUser(data);
    }

    async findAllUsers() {
        return await UsersQuery.findAllUsers();
    }

    async findUserByEmail(email) {
        return await UsersQuery.findUserByEmail(email);
    }

    async findUserById(id) {
        return await UsersQuery.findUserById(id);
    }
}

module.exports = new UsersService();