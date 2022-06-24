const House = require(`../models/House`)

exports.createHouse = (houseData, owner) => House.create(houseData)

exports.getAll = () => House.find()

exports.getOneById = (houseId) => House.findById(houseId)

exports.getOneDetailed = (houseId, model) => House.findById(houseId).populate(model)

exports.findOneByIdAndUpdate = (houseId, updatedHouseData) => House.findByIdAndUpdate(houseId, updatedHouseData, { runValidators: true })

exports.deleteOne = (houseId) => House.findByIdAndDelete(houseId)
