class BaseRequest{
    constructor({email, password}){
        this.email = email;
        this.password = password;
    }
}

class CreateAccountRequest extends BaseRequest{
    constructor(data){
        super(data);
    }
}

module.exports = CreateAccountRequest;