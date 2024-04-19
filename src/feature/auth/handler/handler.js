const AuthService = require("../service/service");

class AuthHandler {
  async register(req, res, next) {
    try {
      const data = req.body;
      const registeredUser = await AuthService.register(data);

      const userResponse = {
        email: registeredUser.email,
      };

      res.status(201).json({
        status: true,
        message: "User registered successfully",
        data: userResponse,
      });
    } catch (error) {
      if (error.message === "Email already used") {
        return res.status(400).json({
          status: false,
          message: "Email already used",
          data: null,
        });
      }
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const data = req.body;
      const token = await AuthService.login(data);
      res.status(200).json({
        status: true,
        message: "User logged in successfully",
        data: token,
      });
    } catch (error) {
      res.status(400).json({
        status: false,
        message: "Invalid email or password",
        data: null,
      });
    }
  }
}

module.exports = new AuthHandler();
