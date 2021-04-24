const UserConfigDataModel = require('../../model/admin/UserConfigDataModel')
const UserConfigHelper = require('../../helper/UserConfigHelper')
const { serverError, configError, httpResponse }  = require('books-constants')
const { updateConfig } = require('../../middleware/validation/config')

class UserConfigController {
    static async addAdminConfig(req, res, next) {
        const error = [];
        const user = req.user;
        // Check if Config Exists
        const findClientConfigById = UserConfigDataModel.findClientConfigById(user);
        if (findClientConfigById.length === 0) {
            console.log(`[Default Admin Config Insert Error]: ${JSON.stringify(findClientConfigById)}`)
            error.push(configError.CONF03)
            return res.status(httpResponse.HTTP_BAD_REQUEST).json(UserConfigHelper.constructErrorResponse(error, null, httpResponse.HTTP_BAD_REQUEST))
        }
        // Check if user is Admin
        if(req.user.isAdmin){
            // Update Admin Permissions
            const updateUserConfig = await UserConfigDataModel.defaultAdminPermissions(user.isAdmin, user);
            if (!updateUserConfig) {
                console.log(`[Default Admin Config Insert Error]: ${JSON.stringify(updateUserConfig)}`)
                error.push(serverError.SER01)
                return res.status(httpResponse.HTTP_BAD_REQUEST).json({'error': error})
            }
            return res.status(200).json(UserConfigHelper.constrcutConfigResponse(updateUserConfig))
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
            const updateUserConfig = await UserConfigDataModel.defaultSuperAdminConfig(user.isSuperAdmin, user);
            if (!updateUserConfig) {
                console.log(`[Default Super Admin Config Insert Error]: ${JSON.stringify(updateUserConfig)}`)
                error.push(serverError.SER01)
                return res.status(httpResponse.HTTP_BAD_REQUEST).json({'error': error})
            }
            return res.status(200).json(UserConfigHelper.constrcutConfigResponse(updateUserConfig))
        }
        error.push(configError.CONF02);
        return res.status(httpResponse.HTTP_BAD_REQUEST)
        .json(UserConfigHelper.constructErrorResponse(error,'admin', httpResponse.HTTP_BAD_REQUEST))
    }

    static async updateUserConfig(req, res, next) {
        const error = [];
        const user = req.user;
        let constructError;
        // Validation
        const updateConfigValidation = await updateConfig(req)
        if(updateConfigValidation.length !== 0) {
            constructError = UserConfigHelper.constructErrorResponse(updateConfigValidation, httpResponse.HTTP_BAD_REQUEST);
            console.log(`[User Config Error]: ${JSON.stringify(constructError)}`)
            return res.status(httpResponse.HTTP_BAD_REQUEST).json(constructError);
        }
        const userObject = {
            _id: req.body.user_id
        }
        // Check if the user has config
        const checkIfConfiExistFortheUser = await UserConfigDataModel.findClientConfigById(userObject);
        if(checkIfConfiExistFortheUser === null) {
            error.push(configError.CONF06)
            constructError = UserConfigHelper.constructErrorResponse(error, httpResponse.HTTP_BAD_REQUEST);
            console.log(`[User Config Error]: ${JSON.stringify(constructError)}`)
            return res.status(httpResponse.HTTP_BAD_REQUEST).json(constructError);
        }
        // Get congig
        const configType = UserConfigHelper.getConfigTypeCode(req.body.config);
        if (configType === null) {
            error.push(configError.CONF07)
            constructError = UserConfigHelper.constructErrorResponse(error, httpResponse.HTTP_BAD_REQUEST);
            console.log(`[User Config Error]: ${JSON.stringify(constructError)}`)
            return res.status(httpResponse.HTTP_BAD_REQUEST).json(constructError);
        }
        const updateUserConfig = await UserConfigDataModel.updateUserConfig(configType, req.body, user, checkIfConfiExistFortheUser)
        if(!updateUserConfig) {
            console.log(`[Update Config Error]: ${JSON.stringify(updateUserConfig)}`)
            error.push(serverError.SER01)
            return res.status(httpResponse.HTTP_BAD_REQUEST).json({'error': error})
        }
        return res.status(200).json({status: httpResponse.HTTP_OK})
    }


}

module.exports = UserConfigController;