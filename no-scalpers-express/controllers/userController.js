const express = require("express");
const router = express.Router();
const Users = require("../models/users");


// Index Route to show users

router.get('/', async (req,res) => {

    try {
      const allUsers = await Users.find();
      res.json({
            status: 200,
            data: allUsers
      })
      console.log(allUsers, 'getting here')
      
      
    } catch (err) {
        res.json({
            status: 500,
            data: err
        })
    }
})


//New Route for a new user

// router.get ('/new', async (req, res) => {
//     try {
//         res.render('users/new.ejs')
//     } catch (err) {
//         return err
//     }
// })

router.post ('/', async (req, res) => {
    try {
        const createdUser = Users.create(req.body);
        console.log(createdUser)
        res.json({
            status: 200,
            data: createdUser
      })

    } catch (err) {
        return err
    }
})

// Show Route for users
router.get ('/:id', async (req, res) => {
    try {
        const foundUser = await Users.findById(req.params.id);
        res.json({
            status: 200,
            data: foundUser
      })
    }catch (err) {
        res.json({
            status: 500,
            data: err
        })
    }
})

//Edit Route for Users

router.get('/:id/edit', async (req, res) => {
    const foundUser = await Users.findById(req.params.id);
    res.render('users/edit.ejs', {
        user: foundUser
    })
})

router.put('/:id', async (req, res) => {
    const editedUser = await Users.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/users')
})


router.delete('/:id', async (req,res) => {
    const deletedUser = await Users.findByIdAndDelete(req.params.id);
    res.redirect('/users')
})
module.exports = router;


