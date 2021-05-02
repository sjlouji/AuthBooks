const { httpResponse} = require('books-constants')

class UserConfigHelper {
    static constructErrorResponse(data, requester ,statusCode) {
        return {
            status: statusCode,
            error: [data]
        }
    }
    static constrcutConfigResponse(data){
        return {
            status: httpResponse.HTTP_OK,
            names: data
        }
    }

    static getConfigTypeCode(data) {
        if(data.code.toUpperCase() === 'CONFIG') return 'userConfig';
        if(data.code.toUpperCase() === 'BLACKLIST') return 'blackList';
        if(data.code.toUpperCase() === 'USERLISTCONFIG') return 'userListConfig';
        return null;
    }
}

module.exports = UserConfigHelper;