const { Router } = require("express");
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oidc');
const GitHubStrategy = require('passport-github2').Strategy;
const {Users, UsersTerceros} = require('../db');
const {Op} = require('sequelize')
const {CLIENT_HOST} = process.env

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
    callbackURL: process.env.GOOGLE_CB_URL,
    scope: ['profile', 'email', 'openid'] 
    },
    function verify(issuer, profile, cb) {
        Users.findOrCreate({
            where: { email: profile.emails[0].value },
            defaults: {
                name: profile.displayName,
                email: profile.emails[0].value,
                role: 'common',
            }
        })
        .then(([user, created]) => {
            if (!created) {
                return cb(null, user)
            } else {
                UsersTerceros.create({user_id: user.id, provider: issuer, subject: profile.id }).then(user3 => {
                    user.addUsersTerceros(user3.id);
                    return cb(null, user)
                })
            }
        })
    })
);

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CB_URL, // <<<<---- cambiar por el de railway
    scope: [ 'user:email' ]
    },
    function(accessToken, refreshToken, profile, cb) {
        Users.findOrCreate({
            where: { [Op.or]: [
                    { githubUser: profile.username},
                    {email: profile.emails[0]?.value? profile.emails[0]?.value : `${profile.username}@projunity.com`}
                ]
            },
            defaults: {
                name: profile.displayName,
                email: profile.emails[0]?.value? profile.emails[0]?.value : `${profile.username}@projunity.com`,
                image: profile.photos[0].value,
                githubUser: profile.username,
                role: 'common',
            }
        })
        .then(([user, created]) => {
            if (!created) {
                return cb(null, user)
            } else {
                UsersTerceros.create({user_id: user.id, provider: profile.provider, subject: profile.id }).then(user3 => {
                    user.addUsersTerceros(user3.id);
                    return cb(null, user)
                })
            }
        })
    }
));

passport.serializeUser(function(user, cb) {
    cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
    Users.findOne({
        where: {id: id},
        attributes: ['id','name','email','role', 'image','githubUser'],
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

router.get('/login/google', passport.authenticate('google'));

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

/* router.get('/login/github', passport.authenticate('github')); */

/* router.get('/auth/github/callback', 
    passport.authenticate('github', { failureRedirect: '/login' }),
    function(req, res) {
        const {id, name, email, role, image, githubUser} = req.user
        if(req.isAuthenticated) {
            res.status(200).json({access: true, id, name, email, role, image, githubUser })
        }
}); */

router.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    const {id, name, email, role, image} = req.user
    if(req.isAuthenticated()) {
        req.login(req.user, function(err) {
          if (err) { return next(err); }
          console.log('Usuario autenticado:', req.user);
          res.redirect(CLIENT_HOST);
        });
    }
});

router.get('/login/github', passport.authenticate('github'));



router.get('/logout', function(req, res) {
    if(req.isAuthenticated()){
        req.logOut(function(err) {
            if (err) { return next(err);}
            res.status(200).json({access: false})
        })
    } else {
        res.send("You don't have a session open");
    }
});

module.exports = router