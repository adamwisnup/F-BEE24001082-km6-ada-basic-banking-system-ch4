const BankAccountsService = require("../service/service");

class BankAccountsHandler {
  async createAccount(req, res) {
    try {
      const data = req.body;
      const account = await BankAccountsService.createAccount(data);
      res.status(201).json({
        status: true,
        message: "Bank account created successfully",
        data: account,
      });
    } catch (error) {
      res.status(400).json({
        status: false,
        message: "Bank account created failed",
        data: null,
      });
    }
  }

  async findAllAccounts(req, res) {
    try {
      const accounts = await BankAccountsService.findAllAccounts();
      res.status(200).json({
        status: true,
        message: "Bank accounts retrieved successfully",
        data: accounts,
      });
    } catch (error) {
      res.status(400).json({
        status: false,
        message: "An error occurred while retrieving bank accounts",
        data: null,
      });
    }
  }

  async findAccountById(req, res) {
    try {
      const account = await BankAccountsService.findAccountById(req.params.id);
      if (!account) {
        return res.status(404).json({
          status: false,
          message: "Bank account not found",
          data: null,
        });
      }
      res.status(200).json({
        status: true,
        message: "Bank account retrieved successfully",
        data: account,
      });
    } catch (error) {
      res.status(400).json({
        status: false,
        message: "An error occurred while retrieving bank account",
        data: null,
      });
    }
  }
}

module.exports = new BankAccountsHandler();
