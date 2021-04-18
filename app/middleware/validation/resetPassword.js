const { passwordPolicy } = require('../../middleware/policy/adminPassword')
const { adminUsernamePolicy } = require('../../middleware/policy/adminUsername')
const { authError } = require('books-constants')
const emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

async function resetPassword(req){
    let error = [];
    const { email } = req;
    if (!email) error.push(constructErrorObject(authError.AUTH01));
    if(!emailRegex.test(email)) error.push(constructErrorObject(authError.AUTH02));
    return error;
}

async function resetPasswordWithToken(req){
    let error = [];
    const { token, password } = req;
    if (!token) error.push(constructErrorObject(authError.AUTH18));
    if (!password) error.push(constructErrorObject(authError.AUTH03));
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
    resetPassword,
    resetPasswordWithToken
};