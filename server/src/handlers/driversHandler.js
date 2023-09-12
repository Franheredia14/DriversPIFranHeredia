const { createDriverDB, getDriverById, getAllDrivers, getDriverByName, updateDriver, deleteDriver } = require("../controllers/controller");

const getDriversHandler = async (req, res) => {

    try {
        res.status(200).json(await getAllDrivers())
    } catch (error) {
        res.status(400).send({error: error.message})
    }
};

const nameDriverHandler = async (req, res) => {
    
    try {
        const {name} = req.query
        const response = await getDriverByName(name)

        res.status(200).json(response)
    } catch (error) {
        res.status(400).send({error: error.message})
    }
};



const getDetailHandler = async (req, res) => {
    const {id} = req.params
    const srcId = isNaN(+id) ? "db" : "api"

    try {
        const response = await getDriverById(id, srcId)

        res.status(200).json(response)
    } catch (error) {
        res.status(400).send({error: error.message})
    }
};

const createDriverHandler = async (req, res) => {
    const {name, surname, description, image, nationality, date, teamIds} = req.body

    try {
        const response = await createDriverDB(name, surname, description, image, nationality, date, teamIds)
        res.status(200).json(response)
    } catch (error) {
        res.status(400).send({error: error.message})
    }
};

const updateDriversHandler = async (req, res) => {
    try {
        const {id, name, description, image, nationality, date, teamIds} = req.body
        if(id && name && description && image && nationality && date && teamIds){
            const driverModify = await updateDriver(id, name, description, image, nationality, date, teamIds);
                res.status(200).json(driverModify)
        } else {
            res.status(400).send('Necesito el id para modificar el driver')
        }

    } catch (error) {
        res.status(500).send({error: error.message})
    }
};

const deleteDriverHandler = async (req, res) => {
    try {
        const {id} = req.params
        const response = await deleteDriver(id)

        if(typeof response === 'string') {
            return res.status(400).json(response)
        } else {
            return res.status(200).json(response)
        }
    } catch (error) {
        res.status(500).send({error: error.message})
    }
}

module.exports = {
    getDriversHandler,
    getDetailHandler,
    createDriverHandler,
    nameDriverHandler,
    updateDriversHandler,
    deleteDriverHandler
};