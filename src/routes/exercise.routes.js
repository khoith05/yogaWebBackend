const express = require('express')
const controller = require('../controllers/exercise.controller')

const router = express.Router()

router.get('/all', controller.getAllExercise)

router.get('/:exerciseId', controller.getExercise)

module.exports = router
