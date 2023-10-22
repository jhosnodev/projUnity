//const axios = require("axios");
const server = require("./src/server");
const { conn } = require("./src/db.js");
const {PORT} = process.env;
const {
  projects,
  userTypes,
  users,
  categories,
  projectCategory,
  tags,
  projectTags,
  commentsProject,
  comments,
  projectsRatings,
  ratings,
  projectsUser
} = require("./src/utils");
const {
  Projects,
  Users,
  UserTypes,
  Category,
  ProjectCategory,
  ProjectTags,
  Tags,
  ProjectComments,
  Comments,
  Ratings,
  ProjectRatings,
  ProjectUser
} = require("./src/db");
const { createUser } = require("./src/services/Users");
conn
  .sync({ force: false })
  .then(() => {
    server.listen(PORT, async () => {
      // await UserTypes.bulkCreate(userTypes);
      // for (let i in users) {
      //   await createUser(users[i]);
      // }
      // await Projects.bulkCreate(projects.data);
      // await Category.bulkCreate(categories);
      // await Tags.bulkCreate(tags);
      // await Comments.bulkCreate(comments);
      // await Ratings.bulkCreate(ratings);
      // await ProjectUser.bulkCreate(projectsUser.data);
      // await ProjectCategory.bulkCreate(projectCategory);
      // await ProjectTags.bulkCreate(projectTags);
      // await ProjectComments.bulkCreate(commentsProject);
      // await ProjectRatings.bulkCreate(projectsRatings);

      
//cada ves que hacen las relaciones hacer un false true 
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((error) => console.error(error));
