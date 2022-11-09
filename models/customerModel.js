const mongoose = require("mongoose")

const customerSchema = new mongoose.Schema({

    email_address: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true,
        unique: true
    },
    status:{
        policies_accepted:{
            type: Boolean,
            default:false
        },
        email_verified:{
            type:Boolean,
            defualt:false
        }
    }

}, { timestamps: true })

module.exports = mongoose.model("customers", customerSchema)