const ErrorCodes = require('./errors')
const Http = require('./http')
const Mail = require('./mail')

let returnConstants = Object.assign({}, ErrorCodes);
returnConstants = Object.assign(returnConstants, Http)
returnConstants = Object.assign(returnConstants, Mail)

module.exports = returnConstants;