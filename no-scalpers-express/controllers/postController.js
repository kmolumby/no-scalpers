const express = require("express");
const router = express.Router();
const Posts = require("../models/posts");


// Index Route to show all posts 

router.get('/', async (req,res) => {

    try {
      const allPosts = await Posts.find();
      res.json({
        status: 200,
        data: allPosts
      });

      console.log(allPosts)
      
    } catch (err) {
        return err
    }
})
//Get Route to show new post form, will most likely delete when starting react


router.get('/', async (req, res) => {
    console.log(req.body)
       try  {
  
        const allPosts = await Posts.find();
  
        res.json({
          status: 200,
          data: allPosts
        });
  
      } catch (err){
  
        res.send(err)
  
      }
  });

// Show Route to individual post 






//Post Route to create a new post

router.post('/', async (req,res) => {
    try {
        const createdPost = await Posts.create(req.body);
        console.log(createdPost)
        res.json({
            status: 200, 
            data: createdPost
        });

    } catch (err) {
        return err
    }
})



// Edit Route to edit existing post

router.get('/:id', async (req, res)=>{
    foundPost = await Posts.findById(req.params.id);
    res.json({
        status: 200,
        data: foundPost
     
    })
  });
  

router.put('/:id', async (req,res) => {
    try {
        const editedPost = await Posts.findByIdAndUpdate(req.params.id, req.body, {new:true});
        res.json({
            status: 200,
            data: editedPost
          });

    } catch (err) {
        return err
    }
})



// Delete Route to Delete post

router.delete('/:id', async (req,res) => {
    try{
        const deletedPost = await Posts.findByIdAndRemove(req.params.id);
        res.json({
            status: 200,
            data: deletedPost
          });
    } catch (err) {
        return err
    }
})
  
  


module.exports = router;