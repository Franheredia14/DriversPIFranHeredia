const {Router} = require('express');

const teamsRouter = Router();
const {getAllTeamsHandler} = require('../handlers/teamsHandlers')

teamsRouter.get('/', getAllTeamsHandler);

module.exports = teamsRouter;