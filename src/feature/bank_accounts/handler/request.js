class BaseRequest {
    constructor({ user_id, bank_name, bank_account_number, balance }) {
        this.user_id = user_id;
        this.bank_name = bank_name;
        this.bank_account_number = bank_account_number;
        this.balance = balance;
    }
}

class CreateBankAccountRequest extends BaseRequest {
    constructor(data) {
        super(data);
    }
}

module.exports = CreateBankAccountRequest;