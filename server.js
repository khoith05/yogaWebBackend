const express = require('express')
const cors = require('cors')
const cookieSession = require('cookie-session')

const dbConfig = require('./src/config/db.config')
const authRouter = require('./src/routes/auth.routes')
const userRouter = require('./src/routes/user.routes')

const app = express()

var corsOptions = {
  origin: 'http://localhost:8081',
}

app.use(cors(corsOptions))

// parse requests of content-type - application/json
app.use(express.json())

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))

app.use(
  cookieSession({
    name: 'bezkoder-session',
    secret: 'COOKIE_SECRET', // should use as secret environment variable
    httpOnly: true,
  })
)

const db = require('./src/models')

db.mongoose
  .connect(`${dbConfig.url}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Successfully connect to MongoDB.')
  })
  .catch((err) => {
    console.error('Connection error', err)
  })

// simple route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to bezkoder application.' })
})

// routes
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept')
  next()
})
app.use('/api/auth', authRouter)
app.use('/api/test', userRouter)

// set port, listen for requests
// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
})
