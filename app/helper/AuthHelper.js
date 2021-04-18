const { authError, serverError, httpResponse } = require('books-constants')

class AuthHelper {
    //  Login
    static constructLoginResponse(data) {
        return {
            status: httpResponse.HTTP_OK,
            token: data.token,
            user: data.user
        }
    }
    // Register
    static constructSignupRequest(data) {
        return {
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            password: data.password,
            bio: data.bio || '',
            profileImg: data.profileImg || ''
        }
    }
    static constructRegisterResponse(data) {
        return {
            status: httpResponse.HTTP_OK,
            token: data.token,
            user: data.user
        }
    }
    // Forgot Password
    static constructForgotPasswordRespone(data) {
        return {
            status: httpResponse.HTTP_OK,
            url: data
        }
    }

    static constructResetPasswordResponse(data) {
        return {
            status: httpResponse.HTTP_OK
        }
    }

    static constructErrorResponse(data, statusCode) {
        return {
            status: statusCode,
            error: data
        }
    }
}

module.exports = AuthHelper;