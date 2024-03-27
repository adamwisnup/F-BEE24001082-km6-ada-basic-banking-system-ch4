const bcrypt = require('bcrypt');
const prisma = require('../../../config/config');

class UsersQuery {
    async createUser(data) {
        const hashedPassword = await bcrypt.hash(data.password, 10);
        return await prisma.user.create({ 
            data: {
                ...data,
                password: hashedPassword
            } 
        });
    }
    
    async findAllUsers() {
        return await prisma.user.findMany({
        });
    }

    async findUserByEmail(email) {
        return await prisma.user.findUnique({ where: { email } });
    }

    async findUserById(id) {
        return await prisma.user.findUnique({ 
            where: { id: parseInt(id) }
        });
    }
}

module.exports = new UsersQuery();
