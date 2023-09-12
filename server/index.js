const axios = require("axios");
const server = require("./src/server");
const { conn } = require('./src/db.js');
const PORT = 3001;
const {getAllTeams} = require('./src/controllers/controller')

conn.sync({ force: false }).then(async () => {
  await getAllTeams();
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
})
}).catch(error => console.error(error))
