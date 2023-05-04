function getAllResult(req, res) {
  try {
    return res.status(200).send({ message: 'getAllExercise' })
  } catch {
    return res.status(400).send({ message: 'Something go wrong' })
  }
}

module.exports = { getAllResult }
