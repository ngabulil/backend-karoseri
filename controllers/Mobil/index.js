const {
    Mobil,
    CarType
} = require("../../models")
const fs = require('fs')
const path = require('path')
const {
    customRes
} = require("../../utils/responseUtil")
const {
    baseurl
} = require("../../config/secret")

const createMobil = async (req, res) => {
    try {
        const {
            name,
            car_type,
            price,
            summary,
            description,
            specification,
            spec_table,
        } = req.body
        const imagePaths = req.files ? req.files.map(file => file.filename) : null;
        console.log(imagePaths)
        if (!imagePaths) {
            return customRes(res, 400, 'image is required')
        }
        if (!name || !car_type || !price || !summary || !description || !specification || !spec_table) {
            if (imagePaths) {
                imagePaths.forEach(imagePath => {
                    if (fs.existsSync(path.join(__dirname, '..', '..', "images", imagePath))) {
                        fs.unlinkSync(path.join(__dirname, '..', '..', "images", imagePath))
                    }
                })
            }
            return customRes(res, 400, 'name, car_type, price, summary, description, specification, spec_table are required')
        }
        const tipeCar = await CarType.findByPk(car_type)
        if (!tipeCar) {
            if (imagePaths) {
                imagePaths.forEach(imagePath => {
                    if (fs.existsSync(path.join(__dirname, '..', '..', "images", imagePath))) {
                        fs.unlinkSync(path.join(__dirname, '..', '..', "images", imagePath))
                    }
                })
            }
            return customRes(res, 404, 'car type not found')
        }
        const mobil = await Mobil.create({
            name,
            type: tipeCar.name,
            car_type,
            price,
            summary,
            description,
            specification,
            spec_table,
            images: JSON.stringify(imagePaths.map((imagePath) => `${baseurl}/images/${imagePath}`))
        })
        return customRes(res, 201, 'mobil created', mobil)
    } catch (error) {
        console.log(error);
        return customRes(res, 500, 'internal server error')
    }
}

const getAllMobil = async (req, res) => {
    try {
        const {
            id,
        } = req.query
        // if (car_type) {
        //     const mobils = await Mobil.findAll({
        //         where: {
        //             car_type
        //         }
        //     })
        //     return customRes(res, 200, 'mobil retrieved', mobils.map((mobil) => ({
        //         ...mobil,
        //         spec_table: JSON.parse(mobil.spec_table),
        //         images: JSON.parse(mobil.images)
        //     })))
        // }
        if (id) {
            const mobil = await Mobil.findByPk(id)
            return customRes(res, 200, 'mobil retrieved', {
                ...mobil.dataValues,
                spec_table: JSON.parse(mobil.spec_table),
                images: JSON.parse(mobil.images)
            })
        }
        const mobils = await Mobil.findAll()
        return customRes(res, 200, 'mobil retrieved', mobils.map((mobil) => ({
            ...mobil.dataValues,
            spec_table: JSON.parse(mobil.spec_table),
            images: JSON.parse(mobil.images)
        })))
    } catch (error) {
        console.log(error);
        return customRes(res, 500, 'internal server error')
    }
}

const updateMobil = async (req, res) => {
    try {
        const {
            name,
            car_type,
            price,
            summary,
            description,
            specification,
            spec_table,
        } = req.body
        const {
            id
        } = req.params
        if (!name || !car_type || !price || !summary || !description || !specification || !spec_table || JSON.parse(spec_table).length < 1) {
            return customRes(res, 400, 'name, car_type, price, summary, description, specification, spec_table are required')
        }
        const tipeCar = await CarType.findByPk(car_type)
        if (!tipeCar) {
            return customRes(res, 404, 'car type not found')
        }
        const mobil = await Mobil.findByPk(id)
        if (!mobil) {
            return customRes(res, 404, 'mobil not found')
        }
        if (req.files.length > 0) {
            const oldImages = JSON.parse(mobil.images)
            oldImages.forEach((imagePath) => {
                if (fs.existsSync(path.join(__dirname, '..', '..', "images", imagePath.split('/').pop()))) {
                    fs.unlinkSync(path.join(__dirname, '..', '..', "images", imagePath.split('/').pop()))
                }
            })
            const imagePaths = req.files.map(file => file.filename)
            mobil.images = JSON.stringify(imagePaths.map((imagePath) => `${baseurl}/images/${imagePath}`))
        }
        mobil.name = name
        mobil.type = tipeCar.name
        mobil.car_type = car_type
        mobil.price = price
        mobil.summary = summary
        mobil.description = description
        mobil.specification = specification
        mobil.spec_table = spec_table
        await mobil.save()
        return customRes(res, 200, 'mobil updated', mobil)
    } catch (error) {
        console.log(error);
        return customRes(res, 500, 'internal server error')
    }
}

const deleteMobil = async (req, res) => {
    try {
        const {
            id
        } = req.params
        const mobil = await Mobil.findByPk(id)
        if (!mobil) {
            return customRes(res, 404, 'mobil not found')
        }
        const oldImages = JSON.parse(mobil.images)
        oldImages.forEach((imagePath) => {
            if (fs.existsSync(path.join(__dirname, '..', '..', "images", imagePath.split('/').pop()))) {
                fs.unlinkSync(path.join(__dirname, '..', '..', "images", imagePath.split('/').pop()))
            }
        })
        await mobil.destroy()
        return customRes(res, 200, 'mobil deleted')
    } catch (error) {
        console.log(error);
        return customRes(res, 500, 'internal server error')
    }
}

module.exports = {
    createMobil,
    getAllMobil,
    updateMobil,
    deleteMobil,
}