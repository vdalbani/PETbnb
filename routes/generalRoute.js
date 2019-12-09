//IMPORTING THE ROUTER
const express=require('express');
const router = express.Router();


router.get('/',(req,res)=>{
    res.render('homeViews/home');
    
});


/*
router.get('/',(req,res)=>{
    //prueba
    const {userId} = '123';
    //const {userId} = req.session;
    console.log(userId);
    res.render('homeViews/tempHome',{uAutent:userId});
})
*/

module.exports = router;