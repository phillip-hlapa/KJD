const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const  userSchema = mongoose.Schema({
    username: { type: String, require: true },
    password: {type: String, require: true},
    dateCreated: {type: Date, default: Date.now},
    role: { type: String, required: false, default: 'NORMAL' }
})

module.exports = mongoose.model('User', userSchema);