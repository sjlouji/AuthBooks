const envConfig = require('config')
const jwt = require('jsonwebtoken');

//  Generate Auth Token
let getToken = user => {
    console.log('user', user._id)
    return jwt.sign({
        iss: 'Joan_Louji',
        sub: user._id,
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getDate() + 1)
    }, envConfig.JWT_SECRET.authToken);
}


module.exports = getToken;