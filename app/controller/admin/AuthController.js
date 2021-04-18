const loginValidation = require('../../middleware/validation/login')
const registerValidation = require('../../middleware/validation/register')
const { resetPassword, resetPasswordWithToken } = require('../../middleware/validation/resetPassword')
const UserDataModel = require('../../model/admin/UserDataModel')
const { authError, serverError, httpResponse } = require('books-constants')
const AuthHelper = require('../../helper/AuthHelper');
require('../../../passport')
const getToken = require('../../middleware/jwt/getToken')
const genPasswordResetToken =require('../../middleware/jwt/getResetPasswordToken')
const envConfig = require('config')
const jwt = require('jsonwebtoken');

class AuthController {
    static async passportLogin(req,res, next) {
        let error = [];
        let constructError;
        let constructResponse;
        const { email, password } = req.body;
        console.log(`[Passport Login Payoload]: ${JSON.stringify(req.body)}`)
        // Error handler
        const validation = await loginValidation(req.body);
        if(validation.length !== 0) {
            constructError = AuthHelper.constructErrorResponse(validation, httpResponse.HTTP_BAD_REQUEST);
            console.log(`[Passport Login Error]: ${JSON.stringify(constructError)}`)
            return res.status(httpResponse.HTTP_BAD_REQUEST).json(constructError);
        }
        //  Check if user Exists
        const user = await UserDataModel.findUser(email);
        if(user === null) {
            error.push(authError.AUTH04)
            constructError = AuthHelper.constructErrorResponse(error, httpResponse.HTTP_BAD_REQUEST);
            console.log(`[Passport Login Error]: ${JSON.stringify(constructError)}`)
            return res.status(httpResponse.HTTP_BAD_REQUEST).json(constructError);
        }
        //  Check if user is Active
        if(!user.isActive) {
            error.push(authError.AUTH05)
            constructError = AuthHelper.constructErrorResponse(error, httpResponse.HTTP_UNAUTHORIZED);
            console.log(`[Passport Login Error]: ${JSON.stringify(constructError)}`)
            return res.status(httpResponse.HTTP_UNAUTHORIZED).json(constructError);
        }
        //  Validate Password
        const validPassword = await UserDataModel.bcryptPassword(password, user);
        if(!validPassword) {
            error.push(authError.AUTH06)
            constructError = AuthHelper.constructErrorResponse(error, httpResponse.HTTP_BAD_REQUEST);
            console.log(`[Passport Login Error]: ${JSON.stringify(constructError)}`)
            return res.status(httpResponse.HTTP_BAD_REQUEST).json(constructError);
        }
        //  Generate Token
        const token = getToken(user)
        const verifyId = await UserDataModel.verifyLoginId(user);
        if(!verifyId) {
            console.log(`[Passport Login Error]: ${JSON.stringify(verifyId)}`)
            error.push(serverError.SER01)
            return res.status(httpResponse.HTTP_BAD_REQUEST).json({'error': error})
        }
        constructResponse = AuthHelper.constructLoginResponse({token, user: verifyId});
        console.log(`[Passport Login Success]: ${JSON.stringify(constructResponse)}`)
        return res.status(httpResponse.HTTP_OK).json(constructResponse)
    }

    static async passportRegister(req,res,next) {
        let error = [];
        let constructError;
        let constructResponse;
        const { email, password } = req.body;
        console.log(`[Passport Register Payoload]: ${JSON.stringify(req.body)}`)
        // Error handler
        const validation = await registerValidation(req.body);
        if(validation.length !== 0) {
            constructError = AuthHelper.constructErrorResponse(validation, httpResponse.HTTP_BAD_REQUEST);
            console.log(`[Passport Register Error]: ${JSON.stringify(constructError)}`)
            return res.status(httpResponse.HTTP_BAD_REQUEST).json(constructError);
        }
        //  Check if user Exists
        const userExists = await UserDataModel.findUser(email);
        if(userExists) {
            error.push(authError.AUTH17)
            constructError = AuthHelper.constructErrorResponse(error, httpResponse.HTTP_BAD_REQUEST);
            console.log(`[Passport Register Error]: ${JSON.stringify(constructError)}`)
            return res.status(httpResponse.HTTP_BAD_REQUEST).json(constructError);
        }
        // Encode Password
        const encryptPassword = await UserDataModel.encodePassword(password);
        req.body.password = encryptPassword;
        // Construct Payload
        const constructSignupRequest = AuthHelper.constructSignupRequest(req.body)
        const signup = await UserDataModel.makeSignup(constructSignupRequest);
        if (!signup) {
            console.log(`[Passport Register Error]: ${JSON.stringify(signup)}`);
            error.push(serverError.SER01)
            return res.status(httpResponse.HTTP_BAD_REQUEST).json({'error': error})
        }
        //  Save user to database
        const token = getToken(signup)
        constructResponse = AuthHelper.constructRegisterResponse({token, user: signup});
        console.log(`[Passport Register Success]: ${JSON.stringify(constructResponse)}`)
        return res.status(httpResponse.HTTP_OK).json(constructResponse);
    }

    static async passportForgotPassword(req,res,next) {
        let error = [];
        let constructError;
        let constructResponse;
        const { email } = req.body;
        console.log(`[Passport ForgotPassword Payoload]: ${JSON.stringify(req.body)}`)

        // Error handler
        const validation = await resetPassword(req.body)
        if(validation.length !== 0) {
            constructError = AuthHelper.constructErrorResponse(validation, httpResponse.HTTP_BAD_REQUEST);
            console.log(`[Passport ForgotPassword Error]: ${JSON.stringify(constructError)}`)
            return res.status(httpResponse.HTTP_BAD_REQUEST).json(constructError);
        }
        //  Check if user Exists
        const user = await UserDataModel.findUser(email);
        if(user === null) {
            error.push(authError.AUTH04)
            constructError = AuthHelper.constructErrorResponse(error, httpResponse.HTTP_BAD_REQUEST);
            console.log(`[Passport ForgotPassword Error]: ${JSON.stringify(constructError)}`)
            return res.status(httpResponse.HTTP_BAD_REQUEST).json(constructError);
        }
        //  Check if user is Active
        if(!user.isActive) {
            error.push(authError.AUTH05)
            constructError = AuthHelper.constructErrorResponse(error, httpResponse.HTTP_UNAUTHORIZED);
            console.log(`[Passport ForgotPassword Error]: ${JSON.stringify(constructError)}`)
            return res.status(httpResponse.HTTP_UNAUTHORIZED).json(constructError);
        }
        // Generate Password Reset Token
        const token = genPasswordResetToken(user);
        const resetUrl = `${envConfig.CLIENT_URL}/auth/reset/${token}`
        const timeStamp = new Date();
        // Update data in DB
        const updatePasswordResetToken = await UserDataModel.updateResetToken(token, user, timeStamp);
        if (!updatePasswordResetToken) {
            console.log(`[Passport ForgotPassword Error]: ${JSON.stringify(updatePasswordResetToken)}`);
            error.push(serverError.SER01)
            return res.status(httpResponse.HTTP_BAD_REQUEST).json({'error': error})
        }
        constructResponse = AuthHelper.constructErrorResponse(resetUrl);
        console.log(`[Passport ForgotPassword Success]: ${JSON.stringify(constructResponse)}`)
        return res.status(httpResponse.HTTP_OK).json(constructResponse);
    }

    static async passportResetPassword(req,res,next) {
        let error = [];
        let constructError;
        let constructResponse;
        const { token, password } = req.body;
        console.log(`[Passport ResetPassword Payoload]: ${JSON.stringify(req.body)}`)
        // Error handler
        const validation = await resetPasswordWithToken(req.body)
        if(validation.length !== 0) {
            constructError = AuthHelper.constructErrorResponse(validation, httpResponse.HTTP_BAD_REQUEST);
            console.log(`[Passport ForgotPassword Error]: ${JSON.stringify(constructError)}`)
            return res.status(httpResponse.HTTP_BAD_REQUEST).json(constructError);
        }
        // Verify jwt token
        const verifyJwt = jwt.verify(token, envConfig.JWT_SECRET.resetToken, (err, done) => {
            if(err) {
                return {
                    status: httpResponse.HTTP_UNAUTHORIZED,
                }
            }
        });
        // Verify JWT
        if(verifyJwt && verifyJwt.status === httpResponse.HTTP_UNAUTHORIZED) {
            console.log(`[Passport ResetPassword Error]: ${JSON.stringify(verifyJwt)}`);
            error.push(authError.AUTH19)
            return res.status(httpResponse.HTTP_BAD_REQUEST).json({'error': error})
        }
        // Retrive user information
        const user = await UserDataModel.findByToken(token);
        if(user === null) {
            error.push(authError.AUTH04)
            constructError = AuthHelper.constructErrorResponse(error, httpResponse.HTTP_BAD_REQUEST);
            console.log(`[Passport Login Error]: ${JSON.stringify(constructError)}`)
            return res.status(httpResponse.HTTP_BAD_REQUEST).json(constructError);
        }
        // Encode Password
        const encryptPassword = await UserDataModel.encodePassword(password);
        req.body.password = encryptPassword;
        // Update Password
        const udpatePassword = await UserDataModel.updatePassword(req.body.password, user)
        if (!udpatePassword) {
            error.push(authError.AUTH04)
            constructError = AuthHelper.constructErrorResponse(error, httpResponse.HTTP_BAD_REQUEST);
            console.log(`[Passport Login Error]: ${JSON.stringify(constructError)}`)
            return res.status(httpResponse.HTTP_BAD_REQUEST).json(constructError);
        }
        // Construct Response
        constructResponse = AuthHelper.constructResetPasswordResponse();
        console.log(`[Passport ResetPassword Success]: ${JSON.stringify(constructResponse)}`)
        return res.status(httpResponse.HTTP_OK).json(constructResponse);
    }

}

module.exports =  AuthController;