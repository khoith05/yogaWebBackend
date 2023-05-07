const mongoose = require('mongoose')

const resultSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Types.ObjectId, ref: 'User' },
    exerciseId: { type: mongoose.Types.ObjectId, ref: 'Exercise' },
    point: Number,
    time: Number,
    poses: [
      {
        poseId: { type: mongoose.Types.ObjectId, ref: 'Pose' },
        point: Number,
      },
    ],
  },
  { timestamps: { createdAt: 'created' } }
)

const Result = mongoose.model('Result', resultSchema)

module.exports = Result
