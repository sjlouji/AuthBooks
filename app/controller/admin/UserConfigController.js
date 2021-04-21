const UserConfigDataModel = require('../../model/admin/UserConfigDataModel')
const UserConfigHelper = require('../../helper/UserConfigHelper')
const { serverError, configError, httpResponse }  = require('books-constants')

class UserConfigController {
    static async addAdminConfig(req, res, next) {
        const error = [];
        const user = req.user;
        // Check if Config Exists
        const findClientConfigById = UserConfigDataModel.findClientConfigById(user);
        if (findClientConfigById) {
            console.log(`[Default Admin Config Insert Error]: ${JSON.stringify(findClientConfigById)}`)
            error.push(configError.CONF03)
            return res.status(httpResponse.HTTP_BAD_REQUEST).json(UserConfigHelper.constructErrorResponse(error, null, httpResponse.HTTP_BAD_REQUEST))
        }
        // Check if user is Admin
        if(req.user.isAdmin){
            // Update Admin Permissions
            const updateConfig = await UserConfigDataModel.defaultAdminPermissions(user.isAdmin, user);
            if (!updateConfig) {
                console.log(`[Default Admin Config Insert Error]: ${JSON.stringify(updateConfig)}`)
                error.push(serverError.SER01)
                return res.status(httpResponse.HTTP_BAD_REQUEST).json({'error': error})
            }
            return res.status(200).json(UserConfigHelper.constrcutConfigResponse(updateConfig))
        }
        error.push(configError.CONF01);
        return res.status(httpResponse.HTTP_BAD_REQUEST)
        .json(UserConfigHelper.constructErrorResponse(error,'admin', httpResponse.HTTP_BAD_REQUEST))
    }

    static async addSuperAdminConfig(req, res, next) {
        const error = [];
        const user = req.user;
        // Check if Config Exists
        const findClientConfigById = UserConfigDataModel.findClientConfigById(user);
        if (findClientConfigById) {
            console.log(`[Default Admin Config Insert Error]: ${JSON.stringify(findClientConfigById)}`)
            error.push(configError.CONF03)
            return res.status(httpResponse.HTTP_BAD_REQUEST).json(UserConfigHelper.constructErrorResponse(error, null, httpResponse.HTTP_BAD_REQUEST))
        }
        // Check if user is Super Admin
        if(req.user.isSuperAdmin){
            // Update Super Admin Permissions
            const updateConfig = await UserConfigDataModel.defaultSuperAdminConfig(user.isSuperAdmin, user);
            if (!updateConfig) {
                console.log(`[Default Super Admin Config Insert Error]: ${JSON.stringify(updateConfig)}`)
                error.push(serverError.SER01)
                return res.status(httpResponse.HTTP_BAD_REQUEST).json({'error': error})
            }
            return res.status(200).json(UserConfigHelper.constrcutConfigResponse(updateConfig))
        }
        error.push(configError.CONF02);
        return res.status(httpResponse.HTTP_BAD_REQUEST)
        .json(UserConfigHelper.constructErrorResponse(error,'admin', httpResponse.HTTP_BAD_REQUEST))
    }
}

module.exports = UserConfigController;