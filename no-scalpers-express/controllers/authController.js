const express = require('express');
const router = express.Router();
const User = require('../models/users')
const session = require('express-session')

router.post('/login', async (req, res)=>{
    try{
       const foundUser = await User.findOne({username: req.body.username});
        req.session.logged = true;
        req.session.username = req.body.username;
        const validLogin = await bcrypt.compare(req.body.password, user.password);
        console.log(validLogin);
        if(!validLogin){
            res.json({
                status: 500,
                data: "WHOOPS BAD LOGIN"
            })
        }
        req.session.userId = user._id
        res.json({
            status: 200,
            data: user
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
    console.log(req.body)
    try{
        const newUser = await User.create(req.body);
        
        req.session.logged = true;
        req.session.username = req.body.username;
        res.json({
            status: 200,
            data: newUser
        });
    }catch(err){
        console.log(err)
        res.json({
            status: 500,
            data: err
        })
    }
})

module.exports = router;