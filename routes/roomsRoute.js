const express=require('express');
const router = express.Router();
const path = require("path");
const mongoose = require('mongoose');

const newRoom = require('../models/roomsModel');

//CREATING THE ROUTES
//Route to direct use to Registration form

router.get("/roomListing",(req,res)=>
{
    res.render("roomViews/roomListing");
});

router.get("/roomCreating",(req,res)=>
{
    res.render("roomViews/roomCreating");
});

router.post("/roomCreating",(req,res)=>
{
    const room_errors=[];

    //MONGO SCHEMA CREATION
    const room_formData=
    {
        rTitle: req.body.roomTitle,
        rType: req.body.roomType,
        rDesc: req.body.roomDesc,
        wifi: req.body.isWifi,
        parking: req.body.isParking,
        laundry: req.body.isLaundry,
        rAddress: req.body.roomAddress,
        rCity: req.body.roomCity,
        rPostal: req.body.roomPostal,
        rProvince: req.body.roomProvince,
        rPrice: req.body.roomPrice,
        rPhoto: req.body.roomPhoto
    };

    if(room_formData.rTitle == '')
    {
        room_errors.push('Please enter title');         
    }

    if(room_formData.rType== '')
    {
        room_errors.push('Please select type');         
    }

    if(room_formData.rDesc== '')
    {
        room_errors.push('Please add description');         
    }

    if(room_formData.wifi== null || 
       room_formData.parking == null || 
        room_formData.laundry == null)
    {
        room_errors.push('Please select amenities');         
    }

    if(room_formData.rAddress =='' ||
        room_formData.rCity =='' ||
        room_formData.rPostal=='' ||
        room_formData.rPostal=='')
    {
        room_errors.push('Please enter valid location');         
    }

    if(room_formData.rPrice == '')
    {
        room_errors.push('Please enter price');         
    }
    
    if(room_errors.length > 0)
    {
        res.render("roomViews/roomCreating",{room_message:room_errors});
            
    }else
    {

        const pbNewRoom = new newRoom(room_formData);            
                    
        pbNewRoom.save().then(()=>{console.log(`Room inserted:${pbNewRoom}`)})
        .catch((err)=>{console.log(`Wrong because ${err}`)});

        //just to redirect something
        res.render("homeViews/home");
     }

});



module.exports = router;