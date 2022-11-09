const dotenv =  require('dotenv')
const assert = require('assert')

dotenv.config()

assert(process.env.PORT, 'PORT is required')
assert(process.env.HOST, 'HOST is required')

module.exports = {

    port: process.env.PORT,
    host: process.env.HOST,
    hostUrl: process.env.HOST_URL,
    nodeEnv: process.env.NODE_ENV,
    apiKey: process.env.API_KEY,
    tokenSecret: process.env.TOKEN_SECRET,
    mongoUri: process.env.MONGO_URI,
    deepAiApiKey: process.env.DEEPAI_API_KEY,
    openAiApiKey: process.env.OPENAI_API_KEY
    

}