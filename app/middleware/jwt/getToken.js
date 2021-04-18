const envConfig = require('config')
const jwt = require('jsonwebtoken');

//  Generate Auth Token
let getToken = user => {
    return jwt.sign({
        iss: 'Joan_Louji',
        sub: user.id,
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getDate() + 1)
    }, envConfig.JWT_SECRET.authToken);
}


module.exports = getToken;