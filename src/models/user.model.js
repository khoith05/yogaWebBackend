const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, require: true },
  email: { type: String, unique: true, require: true },
  password: String,
})

const User = mongoose.model('User', userSchema)

module.exports = User
