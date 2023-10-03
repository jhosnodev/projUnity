require("dotenv").config();

const fs = require('fs');
const path = require('path');
const { DB_PASSWORD2 } = process.env;
let data = []
let users = ['gustavo', 'Jhosno', 'Alexis', 'Nico', 'Laura', 'Jesi', 'Danilo', 'Dario']
let github = ['guspaz0', 'jhosnodev', 'dracoalex84','','caapuu-nico','jesib03','danilogomez5', 'dabelgarcia']

for (const prop in users) {
    data = [
        ...data,    
    {
        name: users[prop],
        email: `${users[prop]}@projunity.com`,
        password: `${DB_PASSWORD2}`,
        image: 'https://www.spotteron.net/images/icons/user60.png',
        githubUser: github[prop],
        role: 'admin' 
    }
    ]
}

fs.writeFileSync(__dirname+'/users.json',JSON.stringify(data,0,4, 'utf-8'))