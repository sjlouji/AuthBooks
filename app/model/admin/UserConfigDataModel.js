const mongoose = require('mongoose');
const {UserConfig} = require('../../schemas/index');
const bcrypt = require("bcryptjs");
const { ObjectId } = require('mongodb')
const { Model } = mongoose;

class UserConfigDataModel {
    static async findClientConfigById(user) {
        return await UserConfig.findOne({user_id: ObjectId(user._id)});
    }

    static async getBlacklistPermission(user) {
        const id = user._id;
        const getUserId = await UserConfig.findOne({user_id: ObjectId(id)});
        const permissions = getUserId.blackList;
        return permissions;
    }

    static async getUserlistPermission(user) {
        const id = user._id;
        const getUserId = await UserConfig.findOne({user_id: ObjectId(id)});
        const permissions = getUserId.userListConfig;
        return permissions;
    }

    static async updateUserConfig(configType, data, user, config) {
        return UserConfig.findOneAndUpdate(
            {_id: config._id},
            {[configType]: {
                can_view: data.config.view,
                can_edit: data.config.edit,
                can_delete: data.config.remove,
                can_add: data.config.add,
            }}, {upsert: true, returnOriginal: false},
        );
    }

    static async defaultAdminPermissions(isAdmin, user) {
        if(isAdmin) {
            const adminDefault = UserConfig.create(
                {
                    blackList: {
                        can_view: true, 
                        can_edit: false,
                        can_delete: false, 
                        can_add: false,
                        user_id: user._id,
                        updated_by: user._id
                    },
                    userConfig: {
                        can_view: true, 
                        can_edit: false,
                        can_delete: false, 
                        can_add: false,
                        user_id: user._id,
                        updated_by: user._id
                    },
                    userListConfig: {
                        can_view: true, 
                        can_edit: false,
                        can_delete: false, 
                        can_add: false,
                        user_id: user._id,
                        updated_by: user._id
                    },
                    user_id: user._id,
                    updated_by: user._id
                }
            )
            return adminDefault;
        }
        return null;
    }
    static async defaultSuperAdminConfig(isSuperAdmin, user) {
        if(isSuperAdmin) {
            const superAdminDefault = UserConfig.create(
                {
                    blackList: {
                        can_view: true, 
                        can_edit: true,
                        can_delete: true, 
                        can_add: true,
                        user_id: user._id,
                        updated_by: user._id
                    },
                    userConfig: {
                        can_view: true, 
                        can_edit: true,
                        can_delete: true, 
                        can_add: true,
                        user_id: user._id,
                        updated_by: user._id
                    },
                    userListConfig: {
                        can_view: true, 
                        can_edit: true,
                        can_delete: true, 
                        can_add: true,
                        user_id: user._id,
                        updated_by: user._id
                    },
                    user_id: user._id,
                    updated_by: user._id
                }
            )
            return superAdminDefault;
        }
        return null;
    }
    
}
module.exports = UserConfigDataModel;
