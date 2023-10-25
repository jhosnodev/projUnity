const fs = require('fs')
const users = require('./users.json');
const comments = require('./comments.json');

let commentsUser = []

for (const i in users.data) {
    commentsUser = [
        ...commentsUser,
        {
            UserId: parseInt(i)+1,
            CommentId: Math.round((comments.length-1)*Math.random())+1
        }
    ]
}

fs.writeFileSync(__dirname+'/commentsUser.json',JSON.stringify(commentsUser,0,4),'utf-8')