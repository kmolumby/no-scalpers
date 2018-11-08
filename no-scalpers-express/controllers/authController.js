const express = require('express');
const router = express.Router();
const User = require('../models/users')
const session = require('express-session')

router.post('/login', async (req, res)=>{
    try{
       const createUser = await User.findOne({username: req.body.username});
        res.session.logged = true;
        res.session.username = req.body.username;
        res.json({
            status: 200,
            data: createUser
        });
    }catch(err){
        res.json({
            status: 500,
            data: err
        })
    }
});

//registration
router.post('/register', async (req, res)=>{
    try{
        const newUser = await User.create(req.body);
        // res.session.logged = true;
        req.session.username = req.body.username;
        res.json({
            status: 200,
            data: newUser
        });
    }catch(err){
        res.json({
            status: 500,
            data: err
        })
    }
})

module.exports = router;