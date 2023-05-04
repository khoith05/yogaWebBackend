const mongoose = require('mongoose')

const exerciseSchema = new mongoose.Schema({
  name: String,
  poses: { type: Array, require: true },
  imageUrl: { type: Array, require: true },
  duration: Number,
})

const Exercise = mongoose.model('Exercise', exerciseSchema)

module.exports = Exercise
