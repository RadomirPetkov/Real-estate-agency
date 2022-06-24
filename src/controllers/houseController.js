const houseController = require(`express`).Router()
const { createHouse, getAll, getOneById, getOneDetailed, findOneByIdAndUpdate, deleteOne, rent } = require(`../services/houseService`)

houseController.get(`/`, async (req, res) => {
    const houses = await getAll().lean()
    res.render(`house/aprt-for-recent`, {houses})
})

houseController.get(`/create`, (req, res) => {
    res.render(`house/create`)
})

houseController.post(`/create`, async (req, res) => {
    try {
        const houseData = req.body
        houseData.owner = req.user._id
        await createHouse(houseData)
        res.redirect(`/houses`)
    } catch (error) {
        res.render(`house/create`, { error })
    }
})

houseController.get(`/details/:houseId`,async (req, res) =>{
    const houseId = req.params.houseId
    const currentHouse = await getOneDetailed(houseId, "rentedAHome").lean()
    const currentHouseUnleaned = await getOneById(houseId)
    const ownerId = currentHouse.owner
    const currentUser = req.user?._id
    const isOwner = ownerId == currentUser
    const isAvailable = currentHouse.availablePieces>0
    const isRentedByUser = currentHouseUnleaned.rentedAHome.includes(currentUser)
    const tenants = currentHouse.rentedAHome.map(x=> x.name).join(`, `)
    
    res.render(`house/details`, {...currentHouse, isOwner, isAvailable, isRentedByUser, tenants})
})


houseController.get(`/edit/:houseId`, async (req, res)=>{
    const houseId = req.params.houseId
    const currentHouse = await getOneById(houseId).lean()
    res.render(`house/edit`, currentHouse)
})

houseController.post(`/edit/:houseId`, async (req, res)=>{
    const updatedHouseData = req.body
    const currentHosueId = req.params.houseId
    
    try {
        await findOneByIdAndUpdate(currentHosueId, updatedHouseData)
        res.redirect(`/houses/details/${currentHosueId}`)
    } catch (error) {
        res.render(`house/edit`, {error})
    }
})

houseController.get(`/delete/:houseId`, async (req, res) => {
    const houseId = req.params.houseId
    try {
        await deleteOne(houseId)
        res.redirect(`/houses`)

    } catch (error) {
        res.render(`404`, {error})
    }

})

houseController.get(`/rent/:houseId`, async (req, res)=>{
    const houseId = req.params.houseId
    const currentUserId = req.user._id
    try {
        await rent(houseId, currentUserId)
        res.redirect(`/houses/details/${houseId}`)
    } catch (error) {
        console.log(error);
        
    }
    
})

module.exports = houseController