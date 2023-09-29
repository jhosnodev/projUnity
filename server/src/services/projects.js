const { Projects } = require('../db')
const {Op} = require('sequelize')

const ProjectServices = {
    allProjects: async function (name) {
        try { 
            if (name) {
                const allProjects = await Projects.findAll({
                    where: 
                        {name: { [Op.like]: `%${name}%`},
                    [Op.or]: [ 
                        {name: {[Op.like]: `${name}%`}},
                    ]}
                })
                return allProjects
            } else {
                const allProjects = await Projects.findAll()
                return allProjects
            }
        } catch (error) {
            return error
        }
    },
    projectId: async function (id){
        try {
            const ProjectId = await Projects.findOne({where: {id: id}})
            if (ProjectId) {
                return ProjectId
            } else {
                throw Error('Id no encontrado')
            }
        } catch(error) {
            return error
        }
    },
    createProjects: async function (projectData) {
        try {
            const { id, name, title, description, price, visibility,
                shortDescription, creationDate, updateDate,image,
                commentsAllowed, views, status } = projectData
            let flag = false;
            for (const prop in projectData) {
                let count = 0;
                if(!projectData[prop]) throw Error(`Missing ${projectData[prop]} Data`);
                count === Object.keys(projectData).length? flag = true : count += 1;
            }
            if (flag) {
                const [newProject, created] = await Projects.findOrCreate({
                    where: {id: id},
                    defaults: {...projectData}
                })
                if (created){
                    return newProject
                } else {
                    throw Error('el proyecto ya existe')
                }
            }
        } catch (error) {
            return error
        }
    },
    updateProject: async function (projectData){
        try {
            const { id, name, title, description, price, visibility,
                shortDescription, creationDate, updateDate,image,
                commentsAllowed, views, status } = projectData
            const updated = await Projects.update(projectData, {where: {id: id}})
            if (updated) {
                const response = await Projects.findByPk(id)
                return response
            }
        } catch (error) {
            return error
        }
    },
    bulkProjects: async function (projectData) {
        try {
            const createProject = await Projects.bulkCreate(projectData);
            return createProject
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = ProjectServices