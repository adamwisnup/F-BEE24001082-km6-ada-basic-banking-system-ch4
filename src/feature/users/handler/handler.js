const UsersService = require("../service/service");

class UsersHandler {
  // async createUser(req, res) {
  //     try {
  //         const existingUser = await UsersService.findUserByEmail(req.body.email);
  //         if (existingUser) {
  //             return res.status(400).json({ message: "Email sudah digunakan" });
  //         }
  //         const data = req.body;
  //         const user = await UsersService.createUser(data);

  //         if (user.password) {
  //             delete user.password;
  //         }
  //         res.status(201).json({
  //             status: true,
  //             message: 'User registered successfully',
  //             data: user
  //         });
  //     } catch (error) {
  //         res.status(400).json({
  //             status: false,
  //             message: 'User created failed',
  //             data: null
  //         });
  //     }
  // }

  async findAllUsers(req, res) {
    try {
      const users = await UsersService.findAllUsers();
      users.forEach((user) => {
        if (user.password) {
          delete user.password;
        }
      });
      res.status(200).json({
        status: true,
        message: "Users retrieved successfully",
        data: users,
      });
    } catch (error) {
      res.status(500).json({
        status: false,
        message: "An error occurred while retrieving users",
        data: null,
      });
    }
  }

  async findUserById(req, res) {
    try {
      const user = await UsersService.findUserById(req.params.id);
      if (!user) {
        return res.status(404).json({
          status: false,
          message: "User not found",
          data: null,
        });
      }

      if (user.password) {
        delete user.password;
      }

      res.status(200).json({
        status: true,
        message: "User retrieved successfully",
        data: user,
      });
    } catch (error) {
      res.status(400).json({
        status: false,
        message: "Failed to retrieve user",
        data: null,
      });
    }
  }
}

module.exports = new UsersHandler();
