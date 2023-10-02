const fs = require('fs')
const project = require('./projects.json');
const categories = require('./categories.json');

let categoryProject = []

for (const i in project.data) {
    categoryProject = [
        ...categoryProject,
        {
            ProjectId: parseInt(i)+1,
            CategoryId: Math.round((categories.length-1)*Math.random())+1
        }
    ]
}

fs.writeFileSync(__dirname+'/projectCategory.json',JSON.stringify(categoryProject,'','\n'),'utf-8')