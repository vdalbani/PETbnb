const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reg_Schema= new Schema(
    {
        new_userEmail:"string",
        new_userName:"string",
        new_userLast:"string",
        new_userPass:"string",
        new_userBDay:"string",
        new_userBMonth:"string",
        new_userBYear:"string" 
    });

    const newUsers=mongoose.model('newUsers', reg_Schema);
    
//name of the login model
module.exports= newUsers;