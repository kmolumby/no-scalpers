// requires 

const express = require('express');
const app = express();
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
const postController = require('./controllers/postController');
const userController = require('./controllers/userController');
const cors = require('cors');

require ('./db/db')




//middleware 

app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());



const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    optionsSuccessStatus: 200 
  }
  app.use(cors(corsOptions));


app.use('/users', userController);
app.use('/posts', postController);



app.get('/', (req,res) => {
    res.render('index.ejs')
})


app.listen(9000, () => {
    console.log('listening on port 3000')
} )

