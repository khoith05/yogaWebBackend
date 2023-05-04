const { Exercise, Pose } = require('../models')

async function getExercise(req, res) {
  try {
    const exerciseId = req.params.exerciseId

    const exercise = await Exercise.findById(exerciseId)

    if (!exercise) return res.status(400).send({ message: 'Wrong Id' })

    const {
      poses: poseIds,
      name,
      imageUrl,
      duration,
      level,
      _id: id,
    } = exercise

    const poses = await Pose.find({
      _id: { $in: poseIds },
    })

    const data = {
      id,
      name,
      imageUrl,
      duration,
      level,
      poses,
    }

    return res.status(200).send({ message: 'Success', data })
  } catch {
    return res.status(400).send({ message: 'Something go wrong' })
  }
}

async function getAllExercise(req, res) {
  try {
    const { level = 0 } = req.query

    const exercises = await Exercise.find({ level })

    return res.status(200).send({ data: exercises })
  } catch {
    return res.status(400).send({ message: 'Something go wrong' })
  }
}

// exports.addExercise = async (req, res) => {
//   try {
//     const exercises = req.body

//     const newExercises = await Exercise.insertMany(exercises)

//     return res.status(200).send({ message: 'success', data: newExercises })
//   } catch {
//     return res.status(400).send({ message: 'Something go wrong' })
//   }
// }

// exports.addPose = async (req, res) => {
//   try {
//     const poses = req.body

//     const newPoses = await Pose.insertMany(poses)

//     return res.status(200).send({ message: 'success', data: newPoses })
//   } catch {
//     return res.status(400).send({ message: 'Something go wrong' })
//   }
// }

module.exports = { getAllExercise, getExercise }
