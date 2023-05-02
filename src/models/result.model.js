const mongoose = require('mongoose')

const resultSchema = new mongoose.Schema(
  {
    userId: mongoose.Types.ObjectId,
    exerciseId: mongoose.Types.ObjectId,
    point: Number,
  },
  { timestamps: { createdAt: 'created' } }
)

const Result = mongoose.model('User', resultSchema)

module.exports = Result
