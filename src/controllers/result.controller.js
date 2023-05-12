const { Result } = require('../models')
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId

async function getAllResult(req, res) {
  const page = req.query.page ? parseInt(req.query.page) : 1
  const limit = req.query.limit ? parseInt(req.query.limit) : 10
  const userId = req.userId

  const startIndex = (page - 1) * limit

  const results = {}

  try {
    const noRecords = await Result.countDocuments({
      userId: new ObjectId(userId),
    }).exec()

    results.numberOfPages = Math.ceil(noRecords / limit)
    const records = await Result.find({ userId: new ObjectId(userId) })
      .sort('-created')
      .skip(startIndex)
      .limit(limit)
      .populate({
        path: 'exerciseId',
        select: ['name', 'imageUrl', 'level', '_id'],
      })
      .populate({
        path: 'poses.poseId',
        select: ['name', 'imageUrl', '_id'],
      })
      .exec()

    results.current = records.map(
      ({
        exerciseId: { name, imageUrl, level, _id: exerciseId },
        poses: rawPoses,
        time,
        created,
        point,
        _id,
      }) => {
        const poses = rawPoses.map(
          ({ poseId: { name, imageUrl, _id }, point }) => ({
            name,
            imageUrl,
            id: _id,
            point,
          })
        )
        return {
          name,
          imageUrl,
          level,
          exerciseId,
          id: _id,
          time,
          point,
          created,
          poses,
        }
      }
    )

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

async function getResult(req, res) {
  try {
    const id = req.params.id
    const userId = req.userId
    if (!id) throw 'Missing id'
    const result = await Result.findOne({
      userId: new ObjectId(userId),
      _id: new ObjectId(id),
    })
      .populate({
        path: 'exerciseId',
        select: ['name', 'imageUrl', 'level', '_id'],
      })
      .populate({
        path: 'poses.poseId',
        select: ['name', 'imageUrl', '_id'],
      })
      .exec()

    if (!result) throw `Can't find result`

    const {
      exerciseId: { name, imageUrl, level, _id: exerciseId },
      poses: rawPoses,
      time,
      created,
      point,
      _id,
    } = result

    const poses = rawPoses.map(
      ({ poseId: { name, imageUrl, _id }, point }) => ({
        name,
        imageUrl,
        id: _id,
        point,
      })
    )

    return res.status(200).send({
      name,
      level,
      id: _id,
      poses,
      exerciseId,
      imageUrl,
      time,
      created,
      point,
    })
  } catch (err) {
    return res.status(500).send(err)
  }
}

module.exports = { getAllResult, addResult, getResult }
