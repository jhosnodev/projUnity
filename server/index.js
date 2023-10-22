//const axios = require("axios");
const server = require("./src/server");
const { conn } = require("./src/db.js");
const PORT = 3001;
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
  projectUser,
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
  ProjectUser,
} = require("./src/db");
const { createUser } = require("./src/services/Users");
conn
  .sync({  force: false, alter: false })
  .then(() => {
    server.listen(PORT, async () => {
      // await UserTypes.bulkCreate(userTypes);
      // for (let i in users) {
      //   await createUser(users[i]);
      // }
      // await Projects.bulkCreate(projects.data);
      // await Category.bulkCreate(categories);
      // await Comments.bulkCreate(comments);
      // await Tags.bulkCreate(tags);
      // await Ratings.bulkCreate(ratings); 

      //  await ProjectUser.bulkCreate(projectUser.data);
      // await ProjectCategory.bulkCreate(projectCategory);
      // await ProjectTags.bulkCreate(projectTags);
      // await ProjectComments.bulkCreate(commentsProject);
      // await ProjectRatings.bulkCreate(projectsRatings);
 
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((error) => console.error(error));
