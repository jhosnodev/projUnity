const fs = require('fs')
let data = []
let users = ['gustavo', 'Jhosno', 'Alexis', 'Nico', 'Laura', 'Jesi', 'Danilo', 'Dario']
let github = ['guspaz0', 'jhosnodev', 'dracoalex84','caapuu-nico','jesib03','danilogomez5', 'dabelgarcia']

for (const prop in users) {
    data = [
        ...data,    
    {
        name: users[prop],
        email: `${users[prop]}@projunity.com`,
        password: 'abc123',
        image: 'https://www.spotteron.net/images/icons/user60.png',
        githubuser: github[prop],
    }
    ]
}

fs.writeFileSync(__dirname+'/users.json',JSON.stringify(data,'','\n', 'utf-8'))