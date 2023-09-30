const { Projects } = require('../db')
const {Op} = require('sequelize')

const ProjectServices = {
    allProjects: async function (name) {
        try { 
            if (name) {
                const projectsName = await Projects.findAll({
                    where: 
                        {name: { [Op.like]: `%${name}%`},
                    [Op.or]: [ 
                        {name: {[Op.like]: `${name}%`}},
                    ]}
                })
                return projectsName
            } else {
                const allprojects = await Projects.findAll()
                return allprojects
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
                throw Error(`Id ${id} no encontrado`)
            }
        } catch(error) {
            return error
        }
    },
    createProjects: async function (projectData) {
        try {
            const { name, description, price, visibility, shortDescription,image, commentsAllowed, views, status } = projectData
            if ( !name || !description || !price || !visibility || !shortDescription || !image || !commentsAllowed || !views || !status) {
                throw Error('Missing some Data');
            } else {
                const [newProject, created] = await Projects.findOrCreate({
                    where: {name: name},
                    defaults: {...projectData}
                })
                if (created){
                    return newProject
                } else {
                    throw Error(`el proyecto ${name} ya existe`)
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