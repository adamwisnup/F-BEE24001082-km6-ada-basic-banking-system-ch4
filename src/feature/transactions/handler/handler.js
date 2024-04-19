const TransactionsService = require("../service/service");

class TransactionsHandler {
  async createTransaction(req, res) {
    try {
      const data = req.body;
      const transaction = await TransactionsService.createTransaction(data);

      res.status(201).json({
        status: true,
        message: "Transaction created successfully",
        data: transaction,
      });
    } catch (error) {
      res.status(400).json({
        status: false,
        message: "Transaction created failed",
        data: null,
      });
    }
  }

  async findAllTransactions(req, res) {
    try {
      const transactions = await TransactionsService.findAllTransactions();
      res.status(200).json({
        status: true,
        message: "Transactions retrieved successfully",
        data: transactions,
      });
    } catch (error) {
      res.status(400).json({
        status: false,
        message: "An error occurred while retrieving transactions",
        data: null,
      });
    }
  }

  async findTransactionById(req, res) {
    try {
      const transaction = await TransactionsService.findTransactionById(
        req.params.id
      );
      if (!transaction) {
        return res.status(404).json({
          status: false,
          message: "Transaction not found",
          data: null,
        });
      }
      res.status(200).json({
        status: true,
        message: "Transaction retrieved successfully",
        data: transaction,
      });
    } catch (error) {
      res.status(400).json({
        status: false,
        message: "An error occurred while retrieving transaction",
        data: null,
      });
    }
  }
}

module.exports = new TransactionsHandler();
