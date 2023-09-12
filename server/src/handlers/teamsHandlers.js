const {getAllTeams} = require('../controllers/controller');
const {Team} = require('../db')

const getAllTeamsHandler = async (req, res) => {
    try {
        await getAllTeams()
        const teams = await Team.findAll(); // Obtén todos los equipos de la base de datos
        res.status(200).json(teams)
    } catch (error) {
        res.status(400).send({error: error.message})
    }
}

module.exports = {getAllTeamsHandler};