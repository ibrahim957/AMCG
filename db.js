const db = require('mongoose')

const config = require('./config')

exports.connect = () => {

    db.connect(config.mongoUri).then((response) => {
        console.log(`Database connected`)
    }).catch((error) => {
        console.log(error)
    })

}