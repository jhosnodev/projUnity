const RoutesAutorization = {
    admin: {},
    common: {
        projects: ['GET','POST','PUT'],
        comments: ['GET','POST','PUT'],
        tags: ['GET','POST','PUT'],
        users: ['GET','POST','PUT'],
    },
    guest: {
        projects: ['GET'],
        comments: ['GET'],
        tags: ['GET'],
        users: []
    }
}

module.exports = RoutesAutorization