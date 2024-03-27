class BaseRequest {
    constructor({ user_id, identity_type, identity_number, address }) {
        this.user_id = user_id;
        this.identity_type = identity_type;
        this.identity_number = identity_number;
        this.address = address;
    }
}

class CreateProfileRequest extends BaseRequest {
    constructor(data) {
        super(data);
    }
}

module.exports = CreateProfileRequest;