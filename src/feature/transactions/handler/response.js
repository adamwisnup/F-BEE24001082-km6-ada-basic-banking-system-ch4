class BaseResponse{
    constructor(message, data){
        this.message = message;
        this.data = data;
    }
}

class CreateTransactionResponse extends BaseResponse{
    constructor(data){
        super("create transaction success", data);
    }
}

class FindTransactionsResponse extends BaseResponse{
    constructor(data){
        super("get data transaction success", data);
    }
}

module.exports = {
    CreateTransactionResponse,
    FindTransactionsResponse
};