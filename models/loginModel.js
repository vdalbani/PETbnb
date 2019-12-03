const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mySchema= new Schema(
{
        log_useremail:"string", 
        log_userpassword:"string"
});

const users=mongoose.model('users', mySchema); 

module.exports = users;