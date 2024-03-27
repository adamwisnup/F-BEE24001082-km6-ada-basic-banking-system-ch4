const UsersService = require('../service/service');
const CreateAccountRequest = require('./request');
const {CreateAccountResponse, FindAccountsResponse} = require('./response');

class UsersHandler {
    async createUser(req, res) {
        try {
            const existingUser = await UsersService.findUserByEmail(req.body.email);
            if (existingUser) {
                return res.status(400).json({ message: "Email sudah digunakan" });
            }
            const requestData = new CreateAccountRequest(req.body);
            const user = await UsersService.createUser(requestData);

            if (user.password) {
                delete user.password;
            }

            const responseData = new CreateAccountResponse(user);
            res.status(201).json(responseData);
        } catch (error) {
            res.status(400).json(error.message);
        }
    }

    async findAllUsers(req, res) {
        try {
            const users = await UsersService.findAllUsers();
            users.forEach(user => {
            
                if (user.password) {
                    delete user.password;
                }
            });
            const responseData = new FindAccountsResponse(users);
            res.status(200).json(responseData);
        } catch (error) {
            res.status(400).json(error.message);
        }
    }

    async findUserById(req, res) {
        try {
            const user = await UsersService.findUserById(req.params.id);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            if (user.password) {
                delete user.password;
            }

            const responseData = new FindAccountsResponse(user);
            res.status(200).json(responseData);
        } catch (error) {
            res.status(400).json(error.message);
        }
    }
}

module.exports = new UsersHandler();