//IMPORTING THE ROUTER AND FILES NEEDED
const express=require('express');
const router = express.Router();
const path = require("path");
const mongoose = require('mongoose');

//Importing modelUser.js
const newUsers = require('../models/userModel');
const users = require('../models/loginModel');
var userId=null;

//CREATING THE ROUTES
//Route to direct use to Registration form
router.get("/registration",(req,res)=>
{
    res.render('userViews/registration');

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

    //Autentication
    newUsers.findOne({new_userEmail:reg_formData.new_userEmail})
    .then(thisUser=>
    {
        if(thisUser != null){
            reg_errors.push("USER ALREADY EXIST");
            res.render("userViews/registration",{reg_message:reg_errors});
            console.log(thisUser);
        }
        else
        {
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

            //ERROR VALIDATION
            if(reg_errors.length > 0)
            {
                res.render("userViews/registration",{reg_message:reg_errors});
            
            }else{
            //  res.render("userViews/registration");
                console.log("INFO PASSED SUCCESFULLY");
                console.log(reg_formData);
                
            
                const pbNewUser= new newUsers(reg_formData);

                pbNewUser.save().then(()=>{console.log(`user inserted`)})
                .catch((err)=>{console.log(`Wrong because ${err}`)});
                res.render("homeViews/home");
            }
        }
            
    });
});

/********LOG IN ************* */
//GETTING THE LOG IN VIEW ROUTE
router.get('/log_in',(req,res)=>
{

    res.render('userViews/log_in');
});


router.post('/log_in',(req,res)=>
{
    const errors =[];

    //FORM INCOMING INFORMATION
    const formData=
    {
        log_useremail: req.body.log_email,
        log_userpassword: req.body.log_password
    };

    newUsers.findOne({new_userEmail:formData.log_useremail})
    .then(thisUser=>
    {
        if(thisUser == null){
            errors.push("Sorry user not found");
            res.render('userViews/log_in',{message:errors});
            console.log(thisUser);
        }
        else
        {
            if(thisUser.new_userPass == formData.log_userpassword)
            {
               
                req.session.userInfo=thisUser;
                userId=thisUser; 
                console.log(userId);
               res.render('homeViews/home',{userId:userId});
               
                console.log(thisUser);
                console.log(thisUser.new_userPass);
                
            }else{
                errors.push("PASSWORD IS WRONG");
                res.render('userViews/log_in',{message:errors});
            }
        }
    });
});

router.get('/userDashboard',(req,res)=>
{
 res.render('userViews/userDashboard');
});

router.get('/logout',(req,res)=>{
    //destroying the session
    req.session.destroy();
    res.render("userViews/log_in"); 

    console.log('session destroyed');
    console.log(userId);   
});
//EXPORTING ROUTES

module.exports=router;
