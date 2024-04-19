const {
  createTransaction,
  findAllTransactions,
  findTransactionById,
} = require("../../src/feature/transactions/data/query");

describe("Create Transaction Test", () => {
  beforeEach(async () => {
    await prisma.transaction.deleteMany();
  });

  const transactionData = {
    user_id: 1,
    type: "DEPOSIT",
    amount: 1000000,
  };

  test("should create a new transaction successfully", async () => {
    try {
      const result = await createTransaction(transactionData);

      expect(result).toHaveProperty("id");
      expect(result).toHaveProperty("type", transactionData.type);
      expect(result).toHaveProperty("amount", transactionData.amount);
    } catch (error) {
      throw error;
    }
  });

  test("should handle create transaction error when user not found", async () => {
    try {
      await createTransaction({
        ...transactionData,
        user_id: 999,
      });
    } catch (error) {
      expect(error.message).toBe("Transaction created failed");
    }
  });
});

describe("Find all transactions Test", () => {
  test("should find all transactions", async () => {
    try {
      const result = await findAllTransactions();
      expect(result).toBeInstanceOf(Array);
    } catch (error) {
      throw error;
    }
  });
});

describe("Find transaction by id Test", () => {
  test("should find a transaction by id", async () => {
    try {
      const transaction = await findTransactionById(1);
      expect(transaction).toHaveProperty("id", 1);
    } catch (error) {
      throw error;
    }
  });

  test("should handle find transaction by id error when transaction not found", async () => {
    try {
      await findTransactionById(999);
    } catch (error) {
      expect(error.message).toBe("Transaction not found");
    }
  });
});
