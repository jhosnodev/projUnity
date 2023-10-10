const fs = require('fs')
const project = require('./projects.json');
const rating = require("./ratings.json");

let ratingProject = []

for (const i in project.data) {
    ratingProject = [
        ...ratingProject,
        {
            ProjectId: parseInt(i)+1,
            RatingId: Math.round((rating.length-1)*Math.random())+1
        }
    ]
}

fs.writeFileSync(__dirname+'/projectsRatings.json',JSON.stringify(ratingProject,0,4),'utf-8')