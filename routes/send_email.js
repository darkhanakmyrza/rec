const express = require('express');
const router = express.Router();
const Email = require('../models/Email');
const { reset } = require('nodemon');
const nodemailer = require('nodemailer');
require('dotenv/config');



let transporter = nodemailer.createTransport({
    service : 'gmail',
    auth : {
        user : process.env.EMAIL,
        pass : process.env.PASSWORD
    }
});

router.post('/', async (req, res) => {
    
    const email = await Email.findById(req.body.id);
    let mailoptions = {
        from : process.env.EMAIL,
        to : req.body.email,
        subject : email.email.header,
        text : email.email.body,
    }

    transporter.sendMail(mailoptions, function(err, data){
        if (err){
            res.json({"Error occurs": err});
        }else{
            res.json({"Response": "Email sent"})       
        }
    });
    
});    

router.get('/', async (req, res) => {
    try{
        const emails = await Email.find();
        res.json(emails);
    }catch(err){
        res.json({massage : err});
    }
    
});


module.exports = router;

