class BaseResponse {
    constructor(message, data) {
        this.message = message;
        this.data = data;
    }
}

class CreateAccountResponse extends BaseResponse {
    constructor(data) {
        super("create account success", data);
    }
}

class FindAccountsResponse extends BaseResponse{
    constructor(data){
        super("get data account success", data);
    }
}

module.exports = {CreateAccountResponse, FindAccountsResponse};