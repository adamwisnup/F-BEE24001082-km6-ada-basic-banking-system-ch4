const express = require("express");
const router = express.Router();

const UserHandler = require("../../feature/users/handler/handler");
const ProfileHandler = require("../../feature/profiles/handler/handler");
const BankAccountsHandler = require("../../feature/bank_accounts/handler/handler");
const TransactionsHandler = require("../../feature/transactions/handler/handler");

router.post("/users", UserHandler.createUser);
router.get("/users", UserHandler.findAllUsers);
router.get("/users/:id", UserHandler.findUserById);

router.post("/profiles", ProfileHandler.createProfile);
router.get("/profiles", ProfileHandler.findAllProfiles);
router.get("/profiles/:id", ProfileHandler.findProfileById);

router.post("/accounts", BankAccountsHandler.createAccount);
router.get("/accounts", BankAccountsHandler.findAllAccounts);
router.get("/accounts/:id", BankAccountsHandler.findAccountById);

router.post("/transactions", TransactionsHandler.createTransaction);
router.get("/transactions", TransactionsHandler.findAllTransactions);
router.get("/transactions/:id", TransactionsHandler.findTransactionById);

module.exports = router;
