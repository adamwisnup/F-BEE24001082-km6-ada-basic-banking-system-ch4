const BankAccountsService = require('../service/service');
const CreateBankAccountRequest = require('./request');
const {CreateBankAccountResponse, FindBankAccountsResponse} = require('./response');

class BankAccountsHandler {
    async createAccount(req, res) {
        try {
            const requestData = new CreateBankAccountRequest(req.body);
            const account = await BankAccountsService.createAccount(requestData);
            const responseData = new CreateBankAccountResponse(account);
            res.status(201).json(responseData);
        } catch (error) {
            res.status(400).json(error.message);
        }
    }

    async findAllAccounts(req, res) {
        try {
            const accounts = await BankAccountsService.findAllAccounts();
            const responseData = new FindBankAccountsResponse(accounts);
            res.status(200).json(responseData);
        } catch (error) {
            res.status(400).json(error.message);
        }
    }

    async findAccountById(req, res) {
        try {
            const account = await BankAccountsService.findAccountById(req.params.id);
            if (!account) {
                return res.status(404).json({ message: "Bank account not found" });
            }
            const responseData = new FindBankAccountsResponse(account);
            res.status(200).json(responseData);
        } catch (error) {
            res.status(400).json(error.message);
        }
    }
}

module.exports = new BankAccountsHandler();