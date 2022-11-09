const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const helmet = require('helmet')
const xss = require('xss-clean')

const db = require('./db')
const config = require('./config')

const app = express()

app.use(cors())
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true }))
app.use(morgan('combined'))
app.use(helmet())
app.use(xss())

app.use(require('./middleware/errorHandler'))

require('./controllers/customer/memeController')

app.listen(config.port, () => {
    console.log(`Server listening @ ${config.hostUrl}`)
    db.connect()
})

