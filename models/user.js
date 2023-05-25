const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema(
    {
        firstname: String,
        lastname: String,
        email: String,
        password: String,
        phone: String,
    },
    { timestamps: true }
);

const user = mongoose.model('users', userSchema);
module.exports = user;
