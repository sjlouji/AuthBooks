const { passwordPolicy } = require('../../middleware/policy/adminPassword')
const { authError, serverError } = require('books-constants')
const emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

Array.prototype.equals = function (arr) {
    return this.length == arr.length && this.every((u, i) => u === arr[i]);
}

async function loginValidation(req){
    let error = [];
    const { email, password } = req;
    const validatePayload = validatePayloadKeys(req)
    if(!validatePayload) error.push(constructErrorObject(serverError.SER02))
    if (!email) error.push(constructErrorObject(authError.AUTH01));
    if(!emailRegex.test(email)) error.push(constructErrorObject(authError.AUTH02));
    if (!password) error.push(constructErrorObject(authError.AUTH03));
    return error;
}

function validatePayloadKeys(data) {
    const allowed = ['email', 'password'];
    const payload = Object.keys(data);
    if(!allowed.equals(payload)) return false
    return true;
}

function constructErrorObject(error) {
    return {
        code: error.code,
        message: error.message,
        type: error.type
    };
}

module.exports = loginValidation;