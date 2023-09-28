//const axios = require("axios");
const server = require("./src/server");
const { conn } = require('./src/db.js');
const PORT = 3001;
const projects = require('./src/utils/projects.json')
const Service = require('./src/services').ProjectServices;



conn.sync({ force: true }).then(() => {
  server.listen(PORT, async () => {
    try {
      const data = await Service.bulkProjects(projects.data)
      console.log(projects.data)
    } catch (error) {
      console.log(error)
    }
    console.log(`Server listening on port ${PORT}`);
  })
}).catch(error => console.error(error))
