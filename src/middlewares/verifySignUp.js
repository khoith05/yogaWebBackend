const { User } = require('../models')

async function checkDuplicateUsernameOrEmail(req, res, next) {
  console.log(req.body)
  // Username
  try {
    let user = await User.findOne({
      username: req.body.username,
    }).exec()
    if (user) {
      return res
        .status(400)
        .send({ message: 'Failed! Username is already in use!' })
    }

    // Email
    user = await User.findOne({
      email: req.body.email,
    }).exec()
    if (user) {
      return res
        .status(400)
        .send({ message: 'Failed! Email is already in use!' })
    }

    next()
  } catch (err) {
    return res.status(400).send({ message: 'Something go wrong' })
  }
}

const verifySignUp = {
  checkDuplicateUsernameOrEmail,
}

module.exports = verifySignUp
