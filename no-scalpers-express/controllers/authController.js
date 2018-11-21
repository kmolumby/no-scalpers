const express = require('express');
const router = express.Router();
const User = require('../models/users');
const session = require('express-session');
const bcrypt = require('bcryptjs');


router.post('/login', async (req, res)=>{
    try{
       const foundUser = await User.findOne({username: req.body.username});
       console.log(foundUser, 'getting here on express')
        req.session.logged = true;
        req.session.username = req.body.username;
        console.log(req.session.username, "<----req.session.usernam")
        req.session.userId = foundUser._id;
        console.log(req.session.userId, "SHOW ME PLS")
        console.log(req.session.username, "this is username")
        const validLogin = await bcrypt.compare(req.body.password, foundUser.password);
        console.log(validLogin, "Does this get here?");

        console.log(validLogin);
        if(!validLogin){
            res.json({
                status: 500,
                data: "WHOOPS BAD LOGIN"
            })
        }
        res.json({
            status: 200,
            data: foundUser
        });
    }catch(err){
        console.log(err)
        res.json({
            status: 500,
            data: err
        })
    }
});

// //registration
// router.post('/register', async (req, res)=>{
//     console.log(req.body)
//     try{
//         const newUser = await User.create(req.body);
        
//         req.session.userId = newUser._id;
//         console.log(req.session)
//         console.log(req.session.userId)
//         req.session.logged = true;
//         req.session.username = req.body.username;
//         res.json({
//             status: 200,
//             data: newUser
//         });
//     }catch(err){
//         console.log(err)
//         res.json({
//             status: 500,
//             data: err
//         })
//     }
// })

module.exports = router;