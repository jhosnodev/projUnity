//const axios = require("axios");
const server = require("./src/server");
const { conn } = require('./src/db.js');
const PORT = 3001;
const Service = require('./src/services')
const {projects, userTypes, users, categories, projectCategory, tags, projectTags} = require('./src/utils')
const {Category, ProjectCategory, ProjectTags, Tags} = require('./src/db')

conn.sync({ force: true }).then(() => {
  server.listen(PORT, async () => {
      await Service.userTypeServices.bulkUserTypes(userTypes);
      await Service.ProjectServices.bulkProjects(projects.data);
      await Service.userServices.bulkUsers(users);
      await Category.bulkCreate(categories);
      await ProjectCategory.bulkCreate(projectCategory);
      await Tags.bulkCreate(tags)
      await ProjectTags.bulkCreate(projectTags);

    console.log(`Server listening on port ${PORT}`);
  })
}).catch(error => console.error(error))
