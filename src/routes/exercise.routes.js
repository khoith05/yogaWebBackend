const express = require('express')
const controller = require('../controllers/exercise.controller')

const router = express.Router()

router.get('/all', controller.getAllExercise)

router.get('/:exerciseId', controller.getExercise)

// router.post('/pose', controller.addPose)

// router.post('/exercise', controller.addExercise)

module.exports = router
