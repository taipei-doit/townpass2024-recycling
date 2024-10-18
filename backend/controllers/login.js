var bcrypt = require('bcryptjs');
// var userModel = require("../models/user");

async function login(user, password) {
    var hash = await userModel.getPassword(user);
    if (bcrypt.compareSync(password, hash)) {
        var userInfo = await userModel.getUserInfo(user);
    } else {
        return undefined;
    }
    return {user: userInfo};
}

module.exports = login;