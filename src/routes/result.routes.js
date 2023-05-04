const express = require('express')

const { authJwt } = require('../middlewares')
const controller = require('../controllers/result.controller')

const router = express.Router()

router.get('/all', [authJwt.verifyToken], controller.getAllResult)

module.exports = router
