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
CB_CLOUD_NAME=  'cloudinary bucket name'
CB_API_KEY= 'cloudinary api key'
CB_API_SECRET=  'cloudinary api key'
GOOGLE_CLIENT_ID= 'google app ID'
GOOGLE_CLIENT_SECRET= 'google api key'
GOOGLE_CB_URL= 'google oauth calback url'
GITHUB_CLIENT_ID= 'github app ID'
GITHUB_CLIENT_SECRET= 'github api key - vence cada 2 meses'
GITHUB_CB_URL= 'github oauth callback url'
```


Then start the server.

```bash
$ npm start
```

Login routes:
`${servername}/login` for local authentication.
`${servername}/login/google` for google auth.
`${servername}/login/github` for github auth.

Logout: `${servername}/logout`

Privacy policy:
`${servername}/privpolicy`

available querys to route `/projects?`:
    name=(projectName)
    &category=(categoryName)
    &tag=(tag name)
    &price=(price than less or equal)
    &rating=()
    &username=(user name)

route `/projects/:id` params for get project by id.