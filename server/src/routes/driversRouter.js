const {Router} = require('express');

const {getDriversHandler, getDetailHandler, createDriverHandler, nameDriverHandler, updateDriversHandler, deleteDriverHandler} = require('../handlers/driversHandler')
const driversRouter = Router();

driversRouter.get('/', getDriversHandler);

driversRouter.get('/name', nameDriverHandler);

driversRouter.post('/', createDriverHandler);

driversRouter.put('/', updateDriversHandler);

driversRouter.get('/:id', getDetailHandler);

driversRouter.delete('/:id', deleteDriverHandler);

module.exports = driversRouter;