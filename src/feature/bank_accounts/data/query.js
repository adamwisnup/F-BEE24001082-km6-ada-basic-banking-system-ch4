const prisma = require('../../../config/config');

class BankAccountsQuery {
    async createAccount(data) {
        return await prisma.bankAccount.create({
            data: {
                user: { connect: { id: data.user_id } },
                bank_account_number: data.bank_account_number,
                balance: data.balance,
                bank_name: data.bank_name 
            }
        });
    }

    async findAllAccounts() {
        return await prisma.bankAccount.findMany();
    }

    async findAccountById(id) {
        return await prisma.bankAccount.findUnique({ where: { id: parseInt(id) } });
    }
}

module.exports = new BankAccountsQuery();
