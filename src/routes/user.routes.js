const express = require('express')

const { authJwt } = require('../middlewares')
const controller = require('../controllers/user.controller')

const router = express.Router()

router.get('/all', controller.allAccess)

router.get('/user', [authJwt.verifyToken], controller.userBoard)

router.get('/mod', [authJwt.verifyToken], controller.moderatorBoard)

router.get('/admin', [authJwt.verifyToken], controller.adminBoard)

module.exports = router
