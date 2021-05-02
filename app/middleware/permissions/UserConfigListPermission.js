const { blackListError, configError } = require('books-constants')
const UserConfigDataModel = require('../../model/admin/UserConfigDataModel')
const UserConfigHelper = require('../../helper/UserConfigHelper');
const { httpMethodType, httpResponse } = require('books-constants');

class UserConfigListPermission {
    static async insert(req, res, next){
        const { user } = req;
        const insertPermissions = await UserConfigDataModel.getUserlistPermission(user);
        if(insertPermissions.can_add) return next()
        return res.status(401).json(UserConfigHelper
            .constructErrorResponse(configError.CONF04, null, httpResponse.HTTP_UNAUTHORIZED))
    }
    
    static async edit(req, res, next){
        const { user } = req;
        const insertPermissions = await UserConfigDataModel.getUserlistPermission(user);
        console.log(insertPermissions)
        if(insertPermissions.can_edit) return next()
        return res.status(401).json(UserConfigHelper
            .constructErrorResponse(configError.CONF04, null, httpResponse.HTTP_UNAUTHORIZED))
    }
    
    static async remove(req, res, next){
        const { user } = req;
        const insertPermissions = await UserConfigDataModel.getUserlistPermission(user);
        console.log(insertPermissions)
        if(insertPermissions.can_delete) return next()
        return res.status(401).json(UserConfigHelper
            .constructErrorResponse(configError.CONF04, null, httpResponse.HTTP_UNAUTHORIZED))
    }
    
    static async view(req, res, next){
        const { user } = req;
        const insertPermissions = await UserConfigDataModel.getUserlistPermission(user);
        if(insertPermissions.can_view) return next()
        return res.status(401).json(UserConfigHelper
            .constructErrorResponse(configError.CONF04, null, httpResponse.HTTP_UNAUTHORIZED))
    }
    
}

module.exports = UserConfigListPermission