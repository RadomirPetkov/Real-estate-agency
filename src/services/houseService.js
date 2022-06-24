const House = require(`../models/House`)
const mongoose = require(`mongoose`)
const User = require(`../models/User`)

exports.createHouse = (houseData, owner) => House.create(houseData)

exports.getAll = () => House.find()

exports.getOneById = (houseId) => House.findById(houseId)

exports.getOneDetailed = (houseId, model) => House.findById(houseId).populate(model)

exports.findOneByIdAndUpdate = (houseId, updatedHouseData) => House.findByIdAndUpdate(houseId, updatedHouseData, { runValidators: true })

exports.deleteOne = (houseId) => House.findByIdAndDelete(houseId)

exports.rent = async (houseId, userId) => {
    const house = await House.findById(houseId)
    house.availablePieces -= 1
    house.rentedAHome.push(mongoose.Types.ObjectId(userId))
    house.save()
}

exports.getLastThree =async () => {
    const allHouses = await House.find().lean()
    const lastThreeHouses = allHouses.slice(-3)
    return lastThreeHouses
}