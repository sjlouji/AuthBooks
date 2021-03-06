const mongoose = require('mongoose');
const {User} = require('../../schemas/index');
const bcrypt = require("bcryptjs");
const { Model } = mongoose;

class UserDataModel {

  static async findUser(email) {
      return User.findOne({email: email}).lean();
  }

  static async makeSignup(user) {
    return await User.create(user);
  }

  static bcryptPassword(Password, user) {
    return bcrypt.compare(Password,user.password)
  }

  static verifyLoginId(user) {
    return User.findOne({_id: user._id});
  }

  static async encodePassword(password) {
    const salt = await bcrypt.genSalt(10)
    const saltPassword = await bcrypt.hash(password,salt)
    return saltPassword;
  }

  static async updateResetToken(token, user, timeStamp) {
    return User.findOneAndUpdate({_id: user._id}, {password_reset_token: token, last_passport_reset_timestamp: timeStamp}, {upsert: true})
  }

  static async findByToken(token) {
    return await User.findOne({password_reset_token: token});
  }
  
  static async updatePassword(password, user) {
    console.log('password',)
    console.log(user)
    return await User.findOneAndUpdate({_id: user._id}, {password: password}, {upsert: true})
  }
}
module.exports = UserDataModel;
