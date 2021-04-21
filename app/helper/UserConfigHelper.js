const { httpResponse} = require('books-constants')

class UserConfigHelper {
    static constructErrorResponse(data, requester ,statusCode) {
        return {
            status: statusCode,
            error: data
        }
    }
    static constrcutConfigResponse(data){
        return {
            status: httpResponse.HTTP_OK,
            names: data
        }
    }
}

module.exports = UserConfigHelper;