class BaseRequest {
    constructor({ source_account_id, destination_account_id, amount }) {
        this.source_account_id = source_account_id;
        this.destination_account_id = destination_account_id;
        this.amount = amount;
    }
}

class CreateTransactionRequest extends BaseRequest {
    constructor(data) {
        super(data);
    }
}

module.exports = CreateTransactionRequest;