const fs = require('fs')
const project = require('./projects.json');
const comments = require('./comments.json');

let commentsProject = []

for (const i in project.data) {
    commentsProject = [
        ...commentsProject,
        {
            ProjectId: parseInt(i)+1,
            CommentId: Math.round((comments.length-1)*Math.random())+1
        }
    ]
}

fs.writeFileSync(__dirname+'/commentsProjects.json',JSON.stringify(commentsProject,0,4),'utf-8')