const { Result } = require('../models')

async function getAllResult(req, res) {
  const page = req.query.page ? parseInt(req.query.page) : 1
  const limit = req.query.limit ? parseInt(req.query.limit) : 10
  const userId = req.userId

  const startIndex = (page - 1) * limit

  const results = {}

  try {
    const noRecords = await Result.countDocuments().exec()
    results.numberOfPages = Math.ceil(noRecords / limit)
    results.current = await Result.find({ userId })
      .limit(limit)
      .skip(startIndex)
      .populate({
        path: 'exerciseId',
        select: ['name', 'imageUrl', 'level'],
      })
      .populate({
        path: 'poses.poseId',
        select: ['name', 'imageUrl'],
      })
      .exec()

    return res.status(200).send(results)
  } catch (err) {
    return res.status(500).send(err)
  }
}

async function addResult(req, res) {
  try {
    const userId = req.userId
    const resultData = req.body
    const result = new Result({
      userId,
      ...resultData,
    })
    const newResult = await result.save()

    return res.status(200).send(newResult)
  } catch {
    return res.status(400).send({ message: 'Something go wrong' })
  }
}

module.exports = { getAllResult, addResult }
