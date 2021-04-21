const envConfig = require('config')
const jwt = require('jsonwebtoken');

//  Generate Password Reset Tokens
let genPasswordResetToken = user => {
    return jwt.sign({
        iss: 'Joan_Louji',
        sub: user._id,
        iat: new Date().getTime(),
        exp: Math.floor(Date.now() / 1000) + (60*2)
    }, envConfig.JWT_SECRET.resetToken);
}

module.exports = genPasswordResetToken;