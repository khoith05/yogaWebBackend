const mongoose = require('mongoose')

const exerciseSchema = new mongoose.Schema({
  name: { type: String, require: true },
  poses: { type: Array, default: [] },
  imageUrl: { type: String, require: true },
  duration: { type: Number, require: true },
  level: { type: Number, default: 0 }, // 0,1,2 = easy, medium. hard
})

const Exercise = mongoose.model('Exercise', exerciseSchema)

module.exports = Exercise
