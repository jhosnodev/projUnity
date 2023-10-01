//const axios = require("axios");
const server = require("./src/server");
const { conn } = require('./src/db.js');
const PORT = 3001;
const {projects, userTypes, users, categories, projectCategory, tags, projectTags} = require('./src/utils')
const {Projects, Users, UserTypes, Category, ProjectCategory, ProjectTags, Tags} = require('./src/db')

conn.sync({ force: true }).then(() => {
  server.listen(PORT, async () => {
      await UserTypes.bulkCreate(userTypes);
      await Projects.bulkCreate(projects.data);
      await Users.bulkCreate(users);
      await Category.bulkCreate(categories);
      await ProjectCategory.bulkCreate(projectCategory);
      await Tags.bulkCreate(tags);
      await ProjectTags.bulkCreate(projectTags);

    console.log(`Server listening on port ${PORT}`);
  })
}).catch(error => console.error(error))
