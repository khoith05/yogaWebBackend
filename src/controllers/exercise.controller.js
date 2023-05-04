function getExercise(req, res) {
  return res.status(200).send({ message: 'getExercise' })
}

function getAllExercise(req, res) {
  return res.status(200).send({ message: 'getAllExercise' })
}

module.exports = { getAllExercise, getExercise }
