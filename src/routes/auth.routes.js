const express = require('express')
const { verifySignUp } = require('../middlewares')
const controller = require('../controllers/auth.controller')

const router = express.Router()

router.post(
  '/signup',
  [verifySignUp.checkDuplicateUsernameOrEmail],
  controller.signup
)

router.post('/signin', controller.signin)

router.post('/signout', controller.signout)

module.exports = router
