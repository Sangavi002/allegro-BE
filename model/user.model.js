const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    email: {type: String, require: true},
    password: {type: String, require: true},
    contact:{type: Number, require: true},
},{
    versionKey: false
});

const UserModel = mongoose.model("user",userSchema);

module.exports = UserModel
