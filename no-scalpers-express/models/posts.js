const mongoose = require('mongoose');

const postSchema = new mongoose.Schema ({
    title: ({type: String, required: true}),
    commentBody: ({type: String, required:true}),
    author: ({type: mongoose.Schema.Types.ObjectId, ref:"Users"})
    



})


module.exports = mongoose.model('Post', postSchema)