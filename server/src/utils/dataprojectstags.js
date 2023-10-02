const fs = require('fs')
const tags = require('./tags.json');
const projects = require('./projects.json');

let projectsTags = []
//let projectscontrol = []


for (let i = 0; i < 40; i++) {
    let randomProject = Math.round((projects.data.length-1)*Math.random())+1
    let randomTag = Math.round((tags.length-1)*Math.random())+1
    projectsTags = [
        ...projectsTags,
        {
            ProjectId: randomProject,
            TagId: randomTag
        }
    ]
}


fs.writeFileSync(__dirname+'/projectTags.json',JSON.stringify(projectsTags,'','\n'),'utf-8')