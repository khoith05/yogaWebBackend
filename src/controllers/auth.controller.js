const config = require('../config/auth.config')
const db = require('../models')
const User = db.user

var jwt = require('jsonwebtoken')
var bcrypt = require('bcryptjs')

exports.signup = (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  })

  user.save((err) => {
    if (err) {
      res.status(500).send({ message: err })
      return
    }

    res.send({ message: 'User was registered successfully!' })
    // if (req.body.roles) {
    //   Role.find(
    //     {
    //       name: { $in: req.body.roles },
    //     },
    //     (err, roles) => {
    //       if (err) {
    //         res.status(500).send({ message: err });
    //         return;
    //       }

    //       user.roles = roles.map((role) => role._id);
    //       user.save((err) => {
    //         if (err) {
    //           res.status(500).send({ message: err });
    //           return;
    //         }

    //         res.send({ message: "User was registered successfully!" });
    //       });
    //     }
    //   );
    // } else {
    //   Role.findOne({ name: "user" }, (err, role) => {
    //     if (err) {
    //       res.status(500).send({ message: err });
    //       return;
    //     }

    //     user.roles = [role._id];
    //     user.save((err) => {
    //       if (err) {
    //         res.status(500).send({ message: err });
    //         return;
    //       }

    //       res.send({ message: "User was registered successfully!" });
    //     });
    //   });
    // }
  })
}

exports.signin = (req, res) => {
  User.findOne({
    username: req.body.username,
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err })
      return
    }

    if (!user) {
      return res.status(404).send({ message: 'User Not found.' })
    }

    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password)

    if (!passwordIsValid) {
      return res.status(401).send({ message: 'Invalid Password!' })
    }

    var token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: 86400, // 24 hours
    })

    req.session.token = token

    res.status(200).send({
      id: user._id,
      username: user.username,
      email: user.email,
    })
  })
}

exports.signout = async (req, res) => {
  try {
    req.session = null
    return res.status(200).send({ message: "You've been signed out!" })
  } catch (err) {
    this.next(err)
  }
}
