## Quick Start

install dependencies:

```bash
$ npm install
```
create enviroment variables (.env):

```bash
DB_USER='pg database user'
DB_PASSWORD='pg database password'
DB_HOST=localhost
SALT_KEY='max length 64'
SESSION_KEY= 'cryptographic string hex with maxlength 32'
*/ para autenticacion de terceros /*
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=4
```


Then start the server.

```bash
$ npm start
```

Navigate to [`http://localhost:3001/login`](http://localhost:3001/login).

Login to use!

for login with Github: `http://localhost:3001/login/github`

for login weith Google: `http://localhost:3001/login/google`
