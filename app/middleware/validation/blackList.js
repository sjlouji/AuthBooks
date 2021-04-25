const { blackListError, serverError } = require('books-constants')

async function blackListValidation(req){
    let error = [];
    const { name } = req;
    const validatePayload = validateListPayloadKeys(req)
    if(!validatePayload) error.push(constructErrorObject(serverError.SER02))
    if (!name) error.push(constructErrorObject(blackListError.BLACK01));
    return error;
}

async function updateBlackListValidation(req) {
    let error = [];
    const { name, id } = req;
    const validatePayload = validateUpdatePayloadKeys(req)
    if(!validatePayload) error.push(constructErrorObject(serverError.SER02))
    if (!name) error.push(constructErrorObject(blackListError.BLACK01));
    if (!id) error.push(constructErrorObject(blackListError.BLACK04));
    return error;
}

async function deleteBlackListValidation(req) {
    let error = [];
    const { id } = req;
    const validatePayload = validateDeletePayloadKeys(req)
    if(!validatePayload) error.push(constructErrorObject(serverError.SER02))
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

function validateListPayloadKeys(data) {
    const allowed = ['name'];
    const payload = Object.keys(data);
    if(!allowed.equals(payload)) return false
    return true;
}

function validateUpdatePayloadKeys(data) {
    const allowed = ['name', 'id'];
    const payload = Object.keys(data);
    if(!allowed.equals(payload)) return false
    return true;
}


function validateDeletePayloadKeys(data) {
    const allowed = ['id'];
    const payload = Object.keys(data);
    if(!allowed.equals(payload)) return false
    return true;
}

module.exports = {
    blackListValidation,
    updateBlackListValidation,
    deleteBlackListValidation
};