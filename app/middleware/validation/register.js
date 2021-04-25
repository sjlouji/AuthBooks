const { passwordPolicy } = require('../../middleware/policy/adminPassword')
const { adminUsernamePolicy } = require('../../middleware/policy/adminUsername')
const { authError, serverError } = require('books-constants')
const emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

async function registerValidation(req){
    let error = [];
    const { email, password, firstName, lastName } = req;
    const checkPasswordPolicy = passwordPolicy(req)
    const checkUserNamePolicy = await adminUsernamePolicy(req)
    const validatePayload = validatePayloadKeys(req)
    if(!validatePayload) error.push(constructErrorObject(serverError.SER02))
    if(!firstName) error.push(constructErrorObject(authError.AUTH07));
    if(!lastName) error.push(constructErrorObject(authError.AUTH08));
    if (!email) error.push(constructErrorObject(authError.AUTH01));
    if(!emailRegex.test(email)) error.push(constructErrorObject(authError.AUTH02));
    if (!password) error.push(constructErrorObject(authError.AUTH03));
    if(checkUserNamePolicy.length > 0) {
        checkUserNamePolicy.map(el => {return error.push(el)})
    }
    if(checkPasswordPolicy.length > 0) {
        checkPasswordPolicy.map(el => {return error.push(el)})
    }
    return error;
}

function validatePayloadKeys(data) {
    const allowed = ['email', 'password', 'firstName', 'lastName'];
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

module.exports = registerValidation;