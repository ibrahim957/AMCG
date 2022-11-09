const Customers = require('../../models/customerModel')
const config = require('../../../config')

const policy = async (req, res, next) => {

    try {

        const email_address = req.user

        const query = { email_address: email_address }

        let Customer = await Customers.findOne(query)

        if(!Customer) {
            return next('Customer not found')
        }

        const update = {
            'status.policies_accepted': true
        }

        const option = { new: true }

        await Customers.findOneAndUpdate(query, update, option).then((response) => {

            return res.status(200).send({
                status: 200,
                error: false,
                message: 'Customer policies accepted',
            })

        }).catch((err) => {
            return next(err)
        })

    } catch (err) {
        return next(err)
    }

}

const profile = async (req, res, next) => {

    try {

        const email_address = req.user

        const query = { email_address: email_address }

        let Customer = await Customers.findOne(query)

        if(!Customer) {
            return next('Customer not found')
        }

        const {name, base64_image } = req.body

        if(!name ) {
            return next('Name is required')
        }

        const update = {
            name
        }

        const option = { new: true }

        await Customers.findOneAndUpdate(query, update, option).select(['name','email_address']).then((response) => {

            return res.status(200).send({
                status: 200,
                error: false,
                message: 'Profile added successfully',
                Customer: response
            })

        }).catch((err) => {
            return next(err)
        })

    } catch (err) {
        return next(err)
    }

}

const getProfile = async (req, res, next) => {

    try {
        const email_address = req.user

        const Customer = await Customers.findOne({email_address: email_address})

        if (!Customer) {
            return next('Customer not found')
        }

        return res.status(200).send({
            status: 200,
            error: false,
            message: 'Profile Information',
            Customer: {
                name: Customer.name,
                email_address: Customer.email_address,
                policies: Customer.status.policies_accepted
            },
        })
    } catch (err) {
        return next(err)
    }
}

const changePassword = async (req, res, next) => {

    try {

        const email_address = req.user

       const { currentPassword, newPassword } = req.body

        if(!currentPassword) return next('Current Password is required')

        // if(!await func.validatePassword(currentPassword)) return next('Current Password is not a valid password')

        if(!newPassword) return next('New Password is required')

        // if(!await func.validatePassword(newPassword)) return next('New Password is not a valid password')

        const Customer = await Customers.findOne({ email_address })

        if(Customer){

            if(await bcrypt.compare(currentPassword, Customer.password)) {
                return res.status(200).send({
                    status: 200,
                    error: false,
                    message: 'Password changed succesfully',
                })
            }else{
                return next('Password does not match')
            }
        }
        else{
            return next('No customer found')
        }

    } catch (err) {
        return next(err)
    }
}

module.exports = {
    policy,
    profile,
    getProfile,
    changePassword,
}