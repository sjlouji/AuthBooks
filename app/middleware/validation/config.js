const { configError } = require('books-constants')

async function updateConfig(req){
    let error = [];
    const { user_id } = req.body;
    if (!user_id) error.push(constructErrorObject(configError.CONF05));
    return error;
}

function constructErrorObject(error) {
    return {
        code: error.code,
        message: error.message,
        type: error.type
    };
}


module.exports = {
    updateConfig
};