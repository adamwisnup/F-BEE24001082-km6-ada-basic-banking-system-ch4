const express = require("express");
const router = express.Router();

const UserHandler = require("../../feature/users/handler/handler");
const ProfileHandler = require("../../feature/profiles/handler/handler");
const BankAccountsHandler = require("../../feature/bank_accounts/handler/handler");
const TransactionsHandler = require("../../feature/transactions/handler/handler");
const AuthHandler = require("../../feature/auth/handler/handler");
const restrict = require("../../middlewares/restrict");

router.post("/auth/register", AuthHandler.register);
router.post("/auth/login", AuthHandler.login);

// router.post("/users",restrict, UserHandler.createUser);
router.get("/users",restrict, UserHandler.findAllUsers);
router.get("/users/:id",restrict, UserHandler.findUserById);

router.post("/profiles",restrict, ProfileHandler.createProfile);
router.get("/profiles",restrict, ProfileHandler.findAllProfiles);
router.get("/profiles/:id",restrict, ProfileHandler.findProfileById);

router.post("/accounts",restrict, BankAccountsHandler.createAccount);
router.get("/accounts",restrict, BankAccountsHandler.findAllAccounts);
router.get("/accounts/:id",restrict, BankAccountsHandler.findAccountById);

router.post("/transactions",restrict, TransactionsHandler.createTransaction);
router.get("/transactions",restrict, TransactionsHandler.findAllTransactions);
router.get("/transactions/:id",restrict, TransactionsHandler.findTransactionById);

module.exports = router;
