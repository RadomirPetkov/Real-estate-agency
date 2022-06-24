const House = require(`../models/House`)

exports.createHouse = (houseData) => House.create(houseData)

exports.getAll = () => House.find()