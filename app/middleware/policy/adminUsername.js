const { authError } = require('books-constants')
const BlackListDataModel = require('../../model/admin/BlackListDataModel')

const adminUsernamePolicy = async data => {
    const { firstName, lastName, email } = data
    const blackListUserName_1 = await BlackListDataModel.getBlackListedNames();
    const blackNames = blackListUserName_1.map(el => el.name)
    console.log(blackNames)
    console.log(blackNames.includes(firstName.toUpperCase()))
    
    let error = [];
    if (blackNames.includes(firstName.toUpperCase())) error.push(constructErrorObject(authError.AUTH16, firstName))
    if (blackNames.includes(lastName.toUpperCase())) error.push(constructErrorObject(authError.AUTH16, lastName))
    if (isValidPasswordAccrossEmail(data, blackNames)) error.push(constructErrorObject(authError.AUTH16, email))
    return error;
}

function isValidPasswordAccrossEmail(data, blackNames) {
    const { email } = data
    const emailName = email.split('@')
    if(blackNames.includes(emailName[0].toUpperCase())) {
        return true;
    }
    return false;
}

function constructErrorObject(error, value) {
    return {
        code: error.code,
        message: `Value ${value} ${error.message}`
    };
}

module.exports.adminUsernamePolicy = adminUsernamePolicy
