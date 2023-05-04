function getAllResult(req, res) {
  return res.status(200).send({ message: 'getAllResult' })
}

module.exports = { getAllResult }
