const RoutesAutorization = {
    admin: {},
    common: {
        projects: ['GET','POST','PUT'],
        comments: ['GET','POST','PUT'],
        tags: ['GET','POST','PUT'],
        users: ['GET','POST','PUT'],
        categories: ['GET'],
        payments: ['']
    },
    guest: {
        projects: ['GET'],
        comments: ['GET'],
        tags: ['GET'],
        users: [],
        categories: [],
        payments: []
    }
}

const data = [
    {
        role: 'admin',
        GET: ['projects','comments','tags', 'users','categories','usertypes','payments','apiauth'],
        PUT: ['projects','comments','tags', 'users','categories','usertypes','payments','apiauth'],
        POST: ['projects','comments','tags', 'users','categories','usertypes','payments','apiauth'],
        DELETE: ['projects','comments','tags', 'users','categories','usertypes','payments','apiauth'],
    },
    {
        role: 'common',
        GET: ['projects','comments', 'tags', 'users','categories','payments'],
        PUT: ['projects','comments', 'users'],
        POST: ['projects','comments','tags', 'users','payments'],
        DELETE: ['comments'],
    },
    {
        role: 'guest',
        GET: ['projects','comments', 'tags', 'users','categories'],
        PUT: ['projects','comments'],
        POST: ['projects','comments'],
        DELETE: ['comments'],
    }
]

module.exports = RoutesAutorization