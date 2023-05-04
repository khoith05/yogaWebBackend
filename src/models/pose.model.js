const mongoose = require('mongoose')

const poseSchema = new mongoose.Schema({
  A: Number,
  B: Number,
  C: Number,
  D: Number,
  E: Number,
  F: Number,
  G: Number,
  H: Number,
  I: Number,
  J: Number,
  duration: Number,
  videoUrl: { type: String, require: true },
  imageUrl: { type: String, require: true },
})

const Pose = mongoose.model('User', poseSchema)

module.exports = Pose
