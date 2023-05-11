const config = require('../config/auth.config')
const { User } = require('../models')

const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

async function signUp(req, res) {
  try {
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    })

    const newUser = await user.save()
    if (newUser) {
      const { username, email } = newUser

      const token = jwt.sign({ id: newUser._id }, config.secret, {
        expiresIn: 60 * 60 * 24 * 7, // 24 hours
      })

      return res.status(200).send({ data: { username, email, token } })
    }
    throw 'Some thing went wrong'
  } catch (err) {
    return res.status(400).send({ message: err })
  }
}

async function signIn(req, res) {
  try {
    const user = await User.findOne({
      email: req.body.email,
    }).exec()

    if (!user) {
      throw 'User Not found.'
    }

    const passwordIsValid = bcrypt.compareSync(req.body.password, user.password)

    if (!passwordIsValid) {
      throw 'Invalid Password!'
    }

    const token = jwt.sign({ id: user._id }, config.secret, {
      expiresIn: 60 * 60 * 24 * 7, // 24 hours
    })

    const { username, email } = user

    res.status(200).send({
      data: {
        username,
        email,
        token,
      },
    })
  } catch (err) {
    return res.status(400).send({ message: err })
  }
}

async function signOut(req, res) {
  try {
    return res.status(200).send({ message: "You've been signed out!" })
  } catch (err) {
    this.next(err)
  }
}

module.exports = { signIn, signOut, signUp }
