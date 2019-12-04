require('dotenv').config();

//IMPORTING EXPRESS
const express = require('express');
const app = express();
//IMPORTING MONGOOSE
const mongoose = require("mongoose");

//IMPORTING MONGO
/***IMPORT MONGO HERE** */

mongoose.connect(process.env.DBURL_RG,{useNewUrlParser:true})
.then(()=>{console.log(`RoomsDB is connected`)})
.catch((err)=>{console.log(`error because of ${err}`)});


//STATIC FILES
app.use(express.static("public"));

//Importing handlebars
const exphbs = require('express-handlebars');
app.engine ('handlebars', exphbs());
app.set('view engine', 'handlebars');

//Importing bodyParser
const bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));


//IMPORTING ROUTE OBJECTS
const userRoutes = require("./routes/userRoute");
const generalRoutes = require("./routes/generalRoute");
const roomsRoutes = require("./routes/roomsRoute");

//MAPPING ROUTES AFTER IMPORTING
app.use('/', generalRoutes );
app.use('/userviews', userRoutes);
//IT MIGHT NIGHT ATTENTION
app.use('/roomViews',roomsRoutes);


//IMPORTING MONGO
/***IMPORT MONGO HERE** */
/*
mongoose.connect(process.env.DBURL_RG,{useNewUrlParser:true})
.then(()=>{console.log(`RoomsDB is connected`)})
.catch((err)=>{console.log(`error because of ${err}`)});
*/





//CONNECTION
//Creating server to connect at localhost:3000
const PORT = process.env.PNBPORT | 3000;
app.listen(PORT,()=>{
    console.log(`My Web server is connected in port ${PORT}`);
});