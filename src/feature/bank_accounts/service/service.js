const BankAccountsQuery = require('../data/query');

class BankAccountsService {
    async createAccount(data) {
        return await BankAccountsQuery.createAccount(data);
    }

    async findAllAccounts() {
        return await BankAccountsQuery.findAllAccounts();
    }

    async findAccountById(id) {
        return await BankAccountsQuery.findAccountById(id);
    }
}

module.exports = new BankAccountsService();