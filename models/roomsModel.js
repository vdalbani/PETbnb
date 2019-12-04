const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const room_Schema= new Schema(
    {
        rTitle:"string",
        rType:"string",
        rDesc:"string",
        wifi:"string",
        parking:"string",
        laundry:"string",
        rAddress:"string",
        rCity:"string",
        rPostal:"string",
        rProvince:"string",
        rPrice:"string",
        rPhoto:"string"
    });

    const newRoom=mongoose.model('newRoom', room_Schema);
    
//name of the login model
module.exports= newRoom;