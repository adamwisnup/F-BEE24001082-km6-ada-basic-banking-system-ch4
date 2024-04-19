const AuthQuery = require('../data/query');

class AuthService {
    async register(data) {
        return await AuthQuery.register(data);
    }

    async login(data) {
        return await AuthQuery.login(data);
    }

    async findUserByEmail(email) {
        return await AuthQuery.findUserByEmail(email);
    }
}

module.exports = new AuthService();