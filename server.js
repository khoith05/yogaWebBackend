const express = require('express')
const cors = require('cors')
const cookieSession = require('cookie-session')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
require('dotenv').config()

const authRouter = require('./src/routes/auth.routes')
const userRouter = require('./src/routes/user.routes')
const exerciseRouter = require('./src/routes/exercise.routes')
const resultRouter = require('./src/routes/result.routes')

const app = express()

const frontendUrl =
  process.env.NODE_ENV === 'production'
    ? process.env.FRONT_END_URL_PRODUCTION
    : process.env.FRONT_END_URL
app.use(
  cors({
    origin: frontendUrl,
    credentials: true,
  })
)

// parse requests of content-type - application/json
app.use(express.json())

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))

app.use(
  cookieSession({
    name: 'yoga-web',
    secret: 'COOKIE_SECRET', // should use as secret environment variable
    httpOnly: true,
  })
)
const mongoUri = process.env.MONGO_URI

mongoose
  .connect(mongoUri)
  .then(() => {
    console.log('Successfully connect to MongoDB.')
  })
  .catch((err) => {
    console.error('Connection error', err)
  })

// simple route

// routes
app.use(function (req, res, next) {
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  res.header('Set-Cookie', 'cross-site-cookie=whatever; SameSite=None; Secure')
  next()
})
app.use(bodyParser.json())
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to yoga application.' })
})
app.use('/api/auth', authRouter)
app.use('/api/test', userRouter)
app.use('/api/exercise', exerciseRouter)
app.use('/api/result', resultRouter)

// set port, listen for requests
// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.${process.env.NODE_ENV}`)
})
