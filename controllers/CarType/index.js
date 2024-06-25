const { customRes } = require('../../utils/responseUtil')
const CarType = require('../../models/CarType')

const createType = async (req, res) => {
    try {
        const {
            name
        } = req.body
        if (!name) {
            return customRes(res, 400, 'name is required')
        }
        const carType = await CarType.create({
            name
        })
        return customRes(res, 201, 'car type created', carType)
    } catch (error) {
        console.log(error);
        return customRes(res, 500, 'internal server error')
    }
}

const updateType = async (req, res) => {
    try {
        const {
            name
        } = req.body
        const carType = await CarType.findByPk(req.params.id)
        if (!carType) {
            return customRes(res, 404, 'car type not found')
        }
        carType.name = name
        await carType.save()
        return customRes(res, 200, 'car type updated', carType)
    } catch (error) {
        console.log(error);
        return customRes(res, 500, 'internal server error')
    }
}

const deleteType = async (req, res) => {
    try {
        const carType = await CarType.findByPk(req.params.id)
        if (!carType) {
            return customRes(res, 404, 'car type not found')
        }
        await carType.destroy()
        return customRes(res, 200, 'car type deleted')
    } catch (error) {
        console.log(error);
        return customRes(res, 500, 'internal server error')
    }
}

const getAllType = async (req, res) => {
    try {
        const carTypes = await CarType.findAll()
        return customRes(res, 200, 'car types retrieved', carTypes.map((carType) => carType.dataValues))
    } catch (error) {
        console.log(error);
        return customRes(res, 500, 'internal server error')
    }
}

module.exports = {
    createType,
    updateType,
    deleteType,
    getAllType
}