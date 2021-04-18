const { httpResponse} = require('books-constants')

class BlackListHelper {
    static constructErrorResponse(data, statusCode) {
        return {
            status: statusCode,
            error: data
        }
    }
    static constructBlackListResponse() {
        return {
            status: httpResponse.HTTP_OK,
        }
    }
    static constructResponse(data) {
        return {
            status: httpResponse.HTTP_OK,
            names: data
        }
    }
}

module.exports = BlackListHelper;