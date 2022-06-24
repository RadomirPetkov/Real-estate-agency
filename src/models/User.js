const mongoose = require(`mongoose`)

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name is required']
    },
    username: {
        type: String,
        required: [true, 'Username is required'],
        minLength: 5
    },
    password: {
        type: String,
        required: true,
        minLength: 4
    }
})

const User = mongoose.model(`User`, userSchema)

module.exports = User