const { blackListError } = require('books-constants')

async function blackListValidation(req){
    let error = [];
    const { name } = req;
    if (!name) error.push(constructErrorObject(blackListError.BLACK01));
    return error;
}

async function updateBlackListValidation(req) {
    let error = [];
    const { name, id } = req;
    if (!name) error.push(constructErrorObject(blackListError.BLACK01));
    if (!id) error.push(constructErrorObject(blackListError.BLACK04));
    return error;
}

async function deleteBlackListValidation(req) {
    let error = [];
    const { id } = req;
    if (!id) error.push(constructErrorObject(blackListError.BLACK04));
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
    blackListValidation,
    updateBlackListValidation,
    deleteBlackListValidation
};