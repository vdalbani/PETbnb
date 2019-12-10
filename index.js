require('dotenv').config();

//IMPORTING EXPRESS
const express = require('express');
const app = express();
//IMPORTING MONGOOSE
const mongoose = require("mongoose");

//NEW IMPORTING SESSION
const session = require("express-session");


//IMPORTING MONGO
/***IMPORT MONGO HERE** */

mongoose.connect(process.env.DBURL_RG,{useNewUrlParser:true})
.then(()=>{console.log(`RoomsDB is connected`)})
.catch((err)=>{console.log(`error because of ${err}`)});

//Importing handlebars
const exphbs = require('express-handlebars');
app.engine ('handlebars', exphbs());
app.set('view engine', 'handlebars');

//STATIC FILES
app.use(express.static("public"));

//Importing bodyParser
const bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));


//IMPORTING ROUTE OBJECTS

const userRoutes = require("./routes/userRoute");
const generalRoutes = require("./routes/generalRoute");
const roomsRoutes = require("./routes/roomsRoute");

//NEW SESSION SET UP
//app.use(session({secret:"This is my secret key. This should not be shown to everyone"}))

app.use(session({
    
    resave: false,
    saveUninitialized: false,
    secret:process.env.MY_SECRET,
    cookie:{
        maxAge: 1000 * 60 * 60,
        secure:true
    }
}));

app.use((req,res,next)=>{

    //This is a global variable that can be accessed by templates
    res.locals.user= req.session.userInfo;
    next();
})


//MAPPING ROUTES AFTER IMPORTING
app.use('/', generalRoutes );
app.use('/userviews', userRoutes);
//IT MIGHT NIGHT ATTENTION
app.use('/roomViews',roomsRoutes);







//CONNECTION
//Creating server to connect at localhost:3000
const PORT = process.env.PNBPORT | 3000;
app.listen(PORT,()=>{
    console.log(`My Web server is connected in port ${PORT}`);
});