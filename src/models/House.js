const mongoose = require(`mongoose`)

const houseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name is required']
    },
    type: {
        type: String,
        enum: ["Apartment", "Villa", "House"],
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    houseImg: {
        type: String,
        required: true
    },
    propertyDescription: {
        type: String,
        required: true
    },
    availablePieces: {
        type: Number,
        required: true
    },
    rentedAHome: [{
        type: mongoose.Types.ObjectId,
        ref: "User"
    }],
    owner: [{
        type: mongoose.Types.ObjectId,
        ref: "User"
    }]
})

const House = mongoose.model(`House`, houseSchema)

module.exports = House