const express = require('express')

const { authJwt } = require('../middlewares')
const controller = require('../controllers/result.controller')

const router = express.Router()

router.get('/all', [authJwt.verifyToken], controller.getAllResult)

router.post('/add', [authJwt.verifyToken], controller.addResult)

router.get('/:id', [authJwt.verifyToken], controller.getResult)

module.exports = router
