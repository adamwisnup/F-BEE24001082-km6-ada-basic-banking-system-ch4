const TransactionsService = require('../service/service');
const CreateTransactionRequest = require('./request');
const {CreateTransactionResponse, FindTransactionsResponse} = require('./response');

class TransactionsHandler {
    async createTransaction(req, res) {
        try {
            const requestData = new CreateTransactionRequest(req.body);
            const transaction = await TransactionsService.createTransaction(requestData);
            const responseData = new CreateTransactionResponse(transaction);
            res.status(201).json(responseData);
        } catch (error) {
            res.status(400).json(error.message);
        }
    }

    async findAllTransactions(req, res) {
        try {
            const transactions = await TransactionsService.findAllTransactions();
            const responseData = new FindTransactionsResponse(transactions);
            res.status(200).json(responseData);
        } catch (error) {
            res.status(400).json(error.message);
        }
    }

    async findTransactionById(req, res) {
        try {
            const transaction = await TransactionsService.findTransactionById(req.params.id);
            if (!transaction) {
                return res.status(404).json({ message: "Transaction not found" });
            }
            const responseData = new FindTransactionsResponse(transaction);
            res.status(200).json(responseData);
        } catch (error) {
            res.status(400).json(error.message);
        }
    }
}

module.exports = new TransactionsHandler();