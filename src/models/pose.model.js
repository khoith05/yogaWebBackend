const mongoose = require('mongoose')

const poseSchema = new mongoose.Schema({
  A: { type: Number, require: true },
  B: { type: Number, require: true },
  C: { type: Number, require: true },
  D: { type: Number, require: true },
  E: { type: Number, require: true },
  F: { type: Number, require: true },
  G: { type: Number, require: true },
  H: { type: Number, require: true },
  I: { type: Number, require: true },
  J: { type: Number, require: true },
  duration: { type: Number, require: true },
  videoUrl: { type: String, require: true },
  imageUrl: { type: String, default: '' },
  name: { type: String, require: true },
})

const Pose = mongoose.model('Pose', poseSchema)

module.exports = Pose
