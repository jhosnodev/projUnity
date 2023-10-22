require("dotenv").config();
const { Sequelize } = require("sequelize");

const fs = require('fs');
const path = require('path');
const {
    DEPLOY,
    DB_USER,
    DB_PASSWORD,
    DB_HOST,
} = process.env;



  const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/projunity`, {
      logging: false,
      native: false,
  });

//  const sequelize = new Sequelize(DEPLOY, {
//     logging: false,
//     native: false,
// }); 

const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, '/models'))
    .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
    .forEach((file) => {
        modelDefiners.push(require(path.join(__dirname, '/models', file)));
    });


modelDefiners.forEach(model => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);


const { Users, UserTypes, Projects, Category, Tags, Payments, Comments, Ratings, apiauth, UsersTerceros, Order, Order_detail } = sequelize.models;


// Aca vendrian las relaciones
// Product.hasMany(Reviews);

Users.belongsTo(UserTypes, {
  foreignKey: 'role',
  targetKey: 'name',
//   onDelete: 'SET DEFAULT',
//   onUpdate: 'SET DEFAULT',
  constraints: false,
  allownull: false
})
// Users.hasOne(apiauth, {
//     foreignKey: 'role',
//     targetKey: 'role'
// })
Projects.belongsToMany(Category,{through: 'ProjectCategory'});
Category.belongsToMany(Projects,{through: 'ProjectCategory'});
Projects.belongsToMany(Tags, {through: 'ProjectTags'});
Tags.belongsToMany(Projects, {through: 'ProjectTags'});
Projects.belongsToMany(Payments, {through: 'ProjectPayments'});
Payments.belongsToMany(Projects, {through: 'ProjectPayments'});
Comments.belongsToMany(Projects,{through: 'ProjectComments'});
Projects.belongsToMany(Comments, {through: 'ProjectComments'});
Comments.belongsToMany(Users,{through: 'UsersComments'});
Users.belongsToMany(Comments, {through: 'UsersComments'});
Projects.belongsToMany(Ratings,{through: 'ProjectRatings'});
Ratings.belongsToMany(Projects,{through: 'ProjectRatings'});
Users.belongsToMany(Projects, {through: 'ProjectUser'});
Projects.belongsToMany(Users, {through: 'ProjectUser'});
UsersTerceros.belongsToMany(Users, {through: 'Users_UsersTerceros'});
Users.belongsToMany(UsersTerceros, {through: 'Users_UsersTerceros'});
Users.hasMany(Order);
Order.belongsTo(Users);
Order.hasMany(Order_detail);
Projects.hasMany(Order_detail);
Order_detail.belongsTo(Projects);


//projectos tiene varios comentarios 

module.exports = {
    ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
    conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};