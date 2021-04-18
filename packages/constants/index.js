const ErrorCodes = require('./errors')
const Http = require('./http')

let returnConstants = Object.assign({}, ErrorCodes);
returnConstants = Object.assign(returnConstants, Http)

module.exports = returnConstants;