//const axios = require("axios");
const server = require("./src/server");
const { conn } = require('./src/db.js');
const PORT = 3001;
const projects = require('./src/utils/projects.json')
const Service = require('./src/services');

conn.sync({ force: true }).then(() => {
  server.listen(PORT, async () => {
      await Service.ProjectServices.bulkProjects(projects.data)
      await Service.userServices.
    console.log(`Server listening on port ${PORT}`);
  })
}).catch(error => console.error(error))
