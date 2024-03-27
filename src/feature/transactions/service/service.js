const TransactionsQuery = require('../data/query');

class TransactionsService {
    async createTransaction(data) {
        return await TransactionsQuery.createTransaction(data);
    }

    async findAllTransactions() {
        return await TransactionsQuery.findAllTransactions();
    }

    async findTransactionById(id) {
        return await TransactionsQuery.findTransactionById(id);
    }
}

module.exports = new TransactionsService();