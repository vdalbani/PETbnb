//IMPORTING THE ROUTER AND FILES NEEDED
const express=require('express');
const router = express.Router();
const path = require("path");
const mongoose = require('mongoose');
//NOT SURE ABOUT THIS
//const bodyParser = require('body-parser');

//Importing modelUser.js
const newUsers = require('../models/userModel');
//user_model
//CREATING THE ROUTES
//Route to direct use to Registration form
router.get("/registration",(req,res)=>
{
    res.render("userViews/registration");
    //res.render("userViews/registration");
});

router.post("/registration",(req,res)=>
{
    
    //MONGO SCHEMA CREATION
    const reg_formData=
    {
        new_userEmail: req.body.reg_email,
        new_userName: req.body.firstname,
        new_userLast: req.body.lastname,
        new_userPass: req.body.fpassword,
        new_userBDay: req.body.fDay,
        new_userBMonth: req.body.fMonth,
        new_userBYear: req.body.fYear

    };
    

    const reg_errors=[]; 

    if(reg_formData.new_userEmail == '')
    {
        reg_errors.push('Please enter email')
       
    }

    if(reg_formData.new_userName=='')
    {
        reg_errors.push('Please enter first name')
    }

    if(reg_formData.new_userLast=='')
    {
        reg_errors.push('Please enter last name')
    }

    if(reg_formData.new_userPass=='')
    {
        reg_errors.push('Please enter a password')
    }


    if(reg_formData.new_userBDay=='')
    {
        reg_errors.push('Please enter day')
    }

    if(reg_formData.new_userBMonth=='')
    {
        reg_errors.push('Please enter month')
    }

    if(reg_formData.new_userBYear=='')
    {
        reg_errors.push('Please enter year')
    }


    /*
    if(req.new_userEmail== null){
        reg_errors.push('2 worked');
        console.log(reg_formData);
        //console.log(reg_formData.new_userEmail);
    }
    */

    //reg_errors.push('MESAJE DE PRUEBA');
    if(reg_errors.length > 0)
    {
         res.render("userViews/registration",{reg_message:reg_errors});
    }else{
        res.render("userViews/registration");
        console.log("No reviso");
        
        //res.redirect("/");
        /*
        const reg_formData=
        {
            new_userEmail: req.body.reg_email,
            new_userName: req.body.firstname,
            new_userLast: req.body.lastname,
            new_userPass: req.body.fpassword,
            new_userBDay: req.body.fDay,
            new_userBMonth: req.body.fMonth,
            new_userBYear: req.body.fYear
    
        };
       
        const pbNewUser= new newUsers(reg_formData);

        pbNewUser.save().then(()=>{console.log(`user inserted`)})
        .catch((err)=>{console.log(`Wrong because ${err}`)});

        res.render('other/notification',{w_username:pbNewUser});
        console.log(`USER ID =${pbNewUser} email: ${reg_formData.new_userEmail} name: ${reg_formData.new_userName} saved`);
*/
    }
});

//GETTING THE LOG IN VIEW ROUTE
router.get('/log_in',(req,res)=>{
    res.render('userViews/log_in');
});


module.exports=router;
