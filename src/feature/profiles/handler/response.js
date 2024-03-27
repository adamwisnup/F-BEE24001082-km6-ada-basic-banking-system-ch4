class BaseResponse {
    constructor(message, data) {
        this.message = message;
        this.data = data;
    }
}


class CreateProfileResponse extends BaseResponse {
    constructor(data) {
        super("create profile success", data);
    }
    
}

class FindProfilesResponse extends BaseResponse{
    constructor(data){
        super("get data profile success", data);
    }
    
}

module.exports = {
    CreateProfileResponse, 
    FindProfilesResponse
};