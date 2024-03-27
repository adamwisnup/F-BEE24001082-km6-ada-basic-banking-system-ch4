const prisma = require('../../../config/config');

class TransactionsQuery {
    async createTransaction(data) {
        const sourceAccount = await prisma.bankAccount.findUnique({
            where: { id: data.source_account_id },
            select: { balance: true }
        });
        const destinationAccount = await prisma.bankAccount.findUnique({
            where: { id: data.destination_account_id },
            select: { balance: true }
        });

        if (!sourceAccount || !destinationAccount) {
            throw new Error("Source or destination account not found");
        }

        if (sourceAccount.balance < data.amount) {
            throw new Error("Insufficient balance in source account");
        }

        await prisma.$transaction([
            prisma.bankAccount.update({
                where: { id: data.source_account_id },
                data: { balance: { decrement: data.amount } }
            }),
            prisma.bankAccount.update({
                where: { id: data.destination_account_id },
                data: { balance: { increment: data.amount } }
            }),
            prisma.transaction.create({
                data: {
                    source_account_id: data.source_account_id,
                    destination_account_id: data.destination_account_id,
                    amount: data.amount
                }
            })
        ]);

        return await prisma.transaction.findFirst({
            where: {
                source_account_id: data.source_account_id,
                destination_account_id: data.destination_account_id,
                amount: data.amount
            }
        });
    }

    async findAllTransactions() {
        return await prisma.transaction.findMany();
    }

    async findTransactionById(id) {
        return await prisma.transaction.findUnique({ where: { id: parseInt(id) } });
    }
}

module.exports = new TransactionsQuery();
