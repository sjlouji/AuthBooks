const mongoose = require('mongoose');
const {BlackList} = require('../../schemas/index');
const bcrypt = require("bcryptjs");
const { Model } = mongoose;

class BlackListDataModel {
    static async findName(name) {
        return BlackList.findOne({name: name}).lean();
    }

    static async insertName(name, user) {
        return BlackList.create({
            name: name,
            user_id: user
        })
    }

    static async getBlackListedNames() {
        return BlackList.find({});
    }

    static async updateName(data, blackListName, user) {
        return BlackList.findOneAndUpdate({_id: data._id}, {name: blackListName, updated_by: user}, {upsert: true});
    }

    static async findId(id) {
        return BlackList.findById(id);
    }

    static async deleteName(blkName) {
        return BlackList.remove({_id: blkName._id});
    }

}
module.exports = BlackListDataModel;
