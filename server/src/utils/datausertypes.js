require("dotenv").config();
const fs = require('fs');

let data = [
    {
        name: 'admin',
        createProject: true,
        editProject: true,
        manageUsers: true,
        managePayments: true
    },
    {
        name: 'common',
        createProject: true,
        editProject: true,
        manageUsers: false,
        managePayments: false
    },
    {
        name: 'guest',
        createProject: false,
        editProject: false,
        manageUsers: false,
        managePayments: false
    }
]

fs.writeFileSync(__dirname+'/usertypes.json',JSON.stringify(data,'','\n', 'utf-8'))