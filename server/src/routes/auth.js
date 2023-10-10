//var express = require('express');
const { Router } = require("express");
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const {Users} = require('../db');
const Service = require('../services').userServices

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
            attributes: ['id','name','email','password','role'],
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

passport.serializeUser(function(user, cb) {
    cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
    Users.findOne({
        where: {id: id},
        attributes: ['id','name','email','role'],
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
        const { name, email, id, role } = req.user
        if(req.isAuthenticated()) {
            res.status(200).json({ access: true, role, id, name, email });
        } else {
            res.redirect('/');
        }
});


router.get('/logout', function(req, res) {
if(req.isAuthenticated()){
    console.log("user logging out");
    req.logout(function(err) {
        if (err) { return next(err);}
    });
    res.status(200).json({access: false});
} else {
    res.send("You don't have a session open");
}
});

router.get('/error', (req, res) => res.send("error logging in"))

router.post("/sign-up", function (req, response) {
    Service.createUser({
        ...req.body,
        password: encryptionPassword(req.body.password)
    }).then(function (user) {
        response.status(201).json(user);
    });
});

module.exports = router