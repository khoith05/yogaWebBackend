const express = require('express')
const { verifySignUp } = require('../middlewares')
const controller = require('../controllers/auth.controller')

const router = express.Router()

router.post(
  '/signup',
  [verifySignUp.checkDuplicateUsernameOrEmail],
  controller.signUp
)

router.post('/signin', controller.signIn)

router.post('/signout', controller.signOut)

module.exports = router
