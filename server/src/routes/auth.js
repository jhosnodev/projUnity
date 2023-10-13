const { Router } = require("express");
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oidc');
const GitHubStrategy = require('passport-github2').Strategy;
const {Users, UsersTerceros} = require('../db');

const pbkdf2 = require('pbkdf2');
const salt = process.env.SALT_KEY;

function encryptionPassword(password) {
    var key = pbkdf2.pbkdf2Sync(
        password, salt, 36000, 64, 'sha256'
    );
    var hash = key.toString('hex');
    return hash;
}

passport.use(new LocalStrategy(
    function(username, password, done) {
        Users.findOne({
            where: {email: username },
            attributes: ['id','name','email','password','role','image'],
            raw:true
        }).then(function (user) {
        
        if (!user) { 
            return done(null, false);
        }
        if (user.password != encryptionPassword(password)) {
            return done(null, false);
        }
        return done(null, user);
        }).catch(function(err) {
            return done(err)
        })
    }
));

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:3001/oauth2/redirect' // <<<<----- cambiar por el de railway
},
function verify(issuer, profile, cb) {
    UsersTerceros.findOne({where: {provider: issuer, subject: profile.id}, raw: true}).then(function(cred) {
        if (!cred) {
            Users.create({name: profile.displayName, email: profile.emails[0].value, role: 'common'}).then(created => {
                UsersTerceros.create({user_id: created.id, provider: issuer, subject: profile.id }).then(user3 => {
                    created.addUsersTerceros(user3.id);
                    var user = {
                        id: created.id,
                        name: created.name,
                        role: created.role,
                        image: created.image,
                        email: created.email
                    };
                    return cb(null, user)
                })

            })
        } else {
            return cb(null, cred);
        }
    })
})
);

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:3001/auth/github/callback" // <<<<---- cambiar por el de railway
    },
    function(accessToken, refreshToken, profile, cb) {
        UsersTerceros.findOne({where: {provider: profile.provider, subject: profile.id}, raw: true}).then(function(cred) {
            if (!cred) {
                Users.create({
                    name: profile.displayName,
                    email: profile._json.email? profile._json.email : `${profile.username}@projunity.com`,
                    image: profile.photos[0].value,
                    githubUser: profile.username,
                    role: 'common',
                }).then(created => {
                    UsersTerceros.create({user_id: created.id, provider: profile.provider, subject: profile.id }).then(user3 => {
                        created.addUsersTerceros(user3.id);
                        var user = {
                            id: created.id,
                            name: created.name,
                            role: created.role,
                            image: created.image,
                            email: created.email
                        };
                        return cb(null, user)
                    })
                })
            } else {
                return cb(null, cred);
            }
        }
    )}
));

passport.serializeUser(function(user, cb) {
    cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
    Users.findOne({
        where: {id: id},
        attributes: ['id','name','email','role', 'image'],
        raw:true
    })
    .then(function(user) {
        if (user) { 
            return cb(null, user)
        }
    }).catch(err => cb(err))
});

const router = Router();

router.route('/login')
    .get((req,res) => {
        res.render('login')
    })
    .post(passport.authenticate('local',{
        failureRedirect: '/login'
    }),
    function(req, res) {
        const { name, email, id, role, image } = req.user
        if(req.isAuthenticated()) {
            res.status(200).json({ access: true, role, id, name, email, image });
        } else {
            res.redirect('/');
        }
});

router.get('/login/google', passport.authenticate('google', {scope: ['profile', 'email']}));

router.get('/oauth2/redirect',
    passport.authenticate('google', {
        failureRedirect: '/login',
        failureMessage: true
    }),
    function(req, res) {
        const {id, name, email, role, image} = req.user
        if(req.isAuthenticated) {
            res.status(200).json({access: true, id, name, email, role, image })
        }
});

router.get('/login/github', passport.authenticate('github', { scope: [ 'user:email' ] }));

router.get('/auth/github/callback', 
    passport.authenticate('github', { failureRedirect: '/login' }),
    function(req, res) {
        const {id, name, email, role, image} = req.user
        if(req.isAuthenticated) {
            res.status(200).json({access: true, id, name, email, role, image })
        }
});

router.get('/logout', function(req, res) {
    if(req.isAuthenticated()){
        req.logOut(function(err) {
            if (err) { return next(err);}
        })
        //res.status(200).json({access: false});
    } else {
        res.send("You don't have a session open");
    }
});

module.exports = router