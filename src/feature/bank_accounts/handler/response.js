class BaseRequest {
    constructor(message, data) {
        this.message = message;
        this.data = data;
    }
}

class CreateBankAccountResponse extends BaseRequest {
    constructor(data) {
        super("create bank account success", data);
    }
    
}

class FindBankAccountsResponse extends BaseRequest{
    constructor(data){
        super("get data bank account success", data);
    }
    
}

module.exports = {
    CreateBankAccountResponse, 
    FindBankAccountsResponse
};