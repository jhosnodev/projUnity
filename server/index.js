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
  projectUser,
  payments
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
  Payments
} = require("./src/db");
const { createUser } = require("./src/services/Users");
conn
  .sync({  force: true })
  .then(() => {
    server.listen(PORT, async () => {
      await UserTypes.bulkCreate(userTypes);
      for (let i in users) {
        await createUser(users[i]);
      }
      await Projects.bulkCreate(projects.data);
      await Category.bulkCreate(categories);
      await Comments.bulkCreate(comments);
      await Ratings.bulkCreate(ratings);
      await Tags.bulkCreate(tags);
      await Payments.bulkCreate(payments);
      await ProjectComments.bulkCreate(commentsProject);
      await ProjectRatings.bulkCreate(projectsRatings);
      await ProjectTags.bulkCreate(projectTags);
      await ProjectUser.bulkCreate(projectUser.data);
      await ProjectCategory.bulkCreate(projectCategory);

      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((error) => console.error(error));