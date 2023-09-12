const axios = require('axios')
const {Driver, Team} = require('../db')
const {Op} = require('sequelize')

const imgUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJBvm_djErnZHaVoCV3yK5DTdmW_oYvTaPgw&usqp=CAU'

const notImg = "https://cdn.pixabay.com/photo/2013/07/12/15/36/motorsports-150157_960_720.png"


const createDriverDB = async (name, surname, description, image, nationality, date, teamIds) => {

    const newDriver = await Driver.create({name, surname, description, image, nationality, date, teamIds})

    if(teamIds.length > 0){
        const teams = await Team.findAll({where: {id: teamIds}})
        await newDriver.addTeam(teams)
    }
    return newDriver
};

const getDriverById = async (id, srcId) => {
    if(srcId === "api") {
        const drvrFromApi = (await axios.get(`http://localhost:5000/drivers/${id}`)).data

        return (!drvrFromApi.image.url || drvrFromApi.image.url === notImg) ? {...drvrFromApi, image : { url: imgUrl}} : drvrFromApi

    } else {
        const drvrFromDB = await Driver.findByPk(id, {
            include:{
                model: Team,
                as: 'Teams',
                attributes: ['name'],
                through: {attributes: [], }
            }
        })
        return drvrFromDB
    }
};

const getAllDrivers = async () => {
        // const imgUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJBvm_djErnZHaVoCV3yK5DTdmW_oYvTaPgw&usqp=CAU'

        // const notImg = "https://cdn.pixabay.com/photo/2013/07/12/15/36/motorsports-150157_960_720.png"

        const driversFromApi = (await axios.get('http://localhost:5000/drivers')).data
        

        const driversFromDatabase = await Driver.findAll({
            include: {
              model: Team,
              as: 'Teams',
              attributes: ['name'],
              through: {attributes: [], }
            }
          });

          const formattedDrivers = driversFromDatabase.map((driver) => {
            return {
              id: driver?.dataValues?.id,
              name: driver?.dataValues?.name, surname: driver?.dataValues?.surname,
              description: driver?.dataValues?.description,
              image: driver?.dataValues?.image,
              nationality: driver?.dataValues?.nationality,
              date: driver?.dataValues?.date, 
              teams: driver?.dataValues?.Teams.map(team => team.name)
            };
          });
          
          const allDrivers = formattedDrivers.concat(driversFromApi)
      
        // const allDrivers = [...driversFromDatabase, ...driversFromApi];
      
        const allDrvrsWithImg = allDrivers.map((driver) => {
            if ( !driver.image.url|| driver.image.url === notImg) {
                return { ...driver, image: {url: imgUrl}}
            }
            return driver;
          });
          return allDrvrsWithImg
};

const getDriverByName = async(name) => {
    const newName = name.toLowerCase()

    const driversApi = (await axios.get('http://localhost:5000/drivers')).data

    // const imgUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJBvm_djErnZHaVoCV3yK5DTdmW_oYvTaPgw&usqp=CAU'

    // const notImg = "https://cdn.pixabay.com/photo/2013/07/12/15/36/motorsports-150157_960_720.png"


    const driversFilter = await driversApi.filter(driver => {
        const forenameLower = driver.name.forename.toLowerCase();
        const surnameLower = driver.name.surname.toLowerCase();

        return forenameLower.includes(newName) || surnameLower.includes(newName)
        // return driver.name.forename.toLowerCase().includes(newName.toLowerCase()) ||
        // driver.name.surname.toLowerCase().includes(newName.toLowerCase)
    }).slice(0, 15);

    const driversDB = await Driver.findAll({
        where: {
                name: {
                    [Op.iLike]: `%${name}%`
                }
        },
        limit: 15
    });

    const allDriversFound = [...driversFilter, ...driversDB]

    const allDriversAct = allDriversFound.map((driver) => {
        if( !driver.image.url|| driver.image.url === notImg) {
            return { ...driver, image: {url: imgUrl}}
        }
        return driver;
    })

    if(allDriversAct.length === 0) {
        throw new Error('No se encontraron los drivers buscados')
    }
    return allDriversAct
};

const getAllTeams = async () => {
    
    const teamsApi = (await axios.get('http://localhost:5000/drivers')).data

        teamsApi.map(async ({teams}) => {
            if(teams) {
                const arr = teams.split(', ')

                arr.map(async (uniqueTeam) => {
                    await Team.findOrCreate({
                        where: {
                            name: uniqueTeam.trim()
                        }
                    })
                })
            }
        })
        return {message: 'Entro al modelo Team'}
};

const updateDriver = async (id, name, surname, description, image, nationality, date, teamIds) => {
    const driverUpdated = await Driver.update({name: name, surname: surname, description: description, image: image, nationality: nationality, date: date, teamIds: teamIds},
    {where: {id: id}});

    if(!driverUpdated) {
        return {error: 'No existe el driver con ese id'}
    } else {
        return driverUpdated
    }
};

const deleteDriver = async (id) => {
    const driver = await Driver.destroy({where: {id: id}})

    if(!driver) {
        return ('No se encontro el driver con el id solicitado')
    } else {
        return {message: 'Se elimino con exito'}
    }
};

module.exports = {createDriverDB, getDriverById, getAllDrivers, getDriverByName, getAllTeams, updateDriver, deleteDriver}