const { authError } = require('books-constants')

const adminPasswordPolicy = data => {
    const { password, first_name, last_name, email } = data
    let error = [];
    var passwordUpperCaseRegex = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var passwordLowerCaseRegex = "abcdefghijklmnopqrstuvwxyz";
    var passwordNumberRegex = "0123456789";
    var passwordSpecialRegex = "!@#$%^&*?_~";

    var nUpperCount = countContain(password, passwordUpperCaseRegex);
    var nLowerCount = countContain(password, passwordLowerCaseRegex);
    var nNumberCount = countContain(password, passwordNumberRegex);
    var nSpecialCount = countContain(password, passwordSpecialRegex);
    var validateAccrossName = isValidPassword({first_name, last_name, password});
    var validateAccrossEmail = isValidPasswordAccrossEmail({email, password});

    if(password.length < 6) {
        error.push(constructErrorObject(authError.AUTH09))
    }
    if(nUpperCount === 0 ) {
        error.push(constructErrorObject(authError.AUTH10))
    }
    if(nLowerCount === 0) {
        error.push(constructErrorObject(authError.AUTH11))
    }
    if(nNumberCount === 0) {
        error.push(constructErrorObject(authError.AUTH12))
    }
    if(nSpecialCount === 0) {
        error.push(constructErrorObject(authError.AUTH13))
    }
    if(!validateAccrossName) {
        error.push(constructErrorObject(authError.AUTH14))
    }
    if(!validateAccrossEmail) {
        error.push(constructErrorObject(authError.AUTH15))
    }
    return error;
}

function isValidPasswordAccrossEmail(data) {
    const { email, password } = data
    const emailName = email.split('@')
    if(password.includes(emailName[0])) {
        return false
    }
    return true;
}

function isValidPassword(data) {
    const { first_name, last_name, password } = data
    if(password.includes(first_name)) {
        return false;
    }
    if(password.includes(last_name)) {
        return false;
    }
    return true;
}

function countContain(strPassword, strCheck)
{ 
    var nCount = 0;
    for (var i = 0; i < strPassword.length; i++) 
    {
        if (strCheck.indexOf(strPassword.charAt(i)) > -1) 
        { 
                nCount++;
        } 
    } 
    return nCount; 
} 

function constructErrorObject(error) {
    return {
        code: error.code,
        message: error.message,
        type: error.type
    };
}

module.exports.passwordPolicy = adminPasswordPolicy
