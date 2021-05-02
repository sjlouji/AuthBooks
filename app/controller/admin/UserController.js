const { httpResponse } = require('books-constants/http');
const UserDataModel = require('../../model/admin/UserDataModel')

class UserController {
    static async listallUsers(req, res, net) {
        // Fetch all users
        const users = await UserDataModel.getUsers();
        res.status(200).json({ status: httpResponse.HTTP_OK, users})
    }
}

module.exports =  UserController;