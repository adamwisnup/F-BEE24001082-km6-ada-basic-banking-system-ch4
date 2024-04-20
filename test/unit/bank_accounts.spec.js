const {
  createAccount,
  findAllAccounts,
  findAccountById,
} = require("../../src/feature/bank_accounts/data/query");

describe("Create Bank Account Test", () => {
  beforeEach(async () => {
    await prisma.bankAccount.deleteMany();
  });

  const accountData = {
    user_id: 1,
    bank_name: "Bank C",
    bank_account_number: "67744",
    balance: 1000000,
  };

  test("should create a new bank account successfully", async () => {
    try {
      const result = await createAccount(accountData);

      expect(result).toHaveProperty("id");
      expect(result).toHaveProperty("bank_name", accountData.bank_name);
      expect(result).toHaveProperty(
        "bank_account_number",
        accountData.bank_account_number
      );
      expect(result).toHaveProperty("balance", accountData.balance);
    } catch (error) {
      throw error;
    }
  });
});

describe("Find all bank accounts Test", () => {
  test("should find all bank accounts", async () => {
    try {
      const result = await findAllAccounts();
      expect(result).toBeInstanceOf(Array);
    } catch (error) {
      throw error;
    }
  });
});

describe("Find bank account by id Test", () => {
  test("should find bank account by id", async () => {
    try {
      const result = await findAccountById(1);
      expect(result).toHaveProperty("id", 1);
    } catch (error) {
      throw error;
    }
  });

  test("should handle error when bank account not found", async () => {
    try {
      const accountId = 999;
      await findAccountById(accountId);
    } catch (error) {
      expect(error.message).toBe("Bank account not found");
    }
  });
});
