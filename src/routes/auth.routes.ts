import User from "../models/user.model";
import jwt from "jsonwebtoken";
const router = require('express').Router();
const bcrypt = require("bcrypt");

const maxAge = 3*24*3600;
//@ts-ignore
const createToken = (id) =>{
     return jwt.sign({ id },'krohn',{
         expiresIn:maxAge
     });
}
//REGISTER
//@ts-ignore
router.post('/signup',async (req, res) => {
    const {first_name, second_name, age, username, email, password, phone} = req.body;

    try {
        const user = await User.create({first_name, second_name, age, username, email, password, phone});
        const token = createToken(user._id)
        res.cookie('jwt',token,{httpOnly:true,maxAge:maxAge*1000});
        res.status(200).json({user:user._id});
    } catch (err) {
        //@ts-ignore
        const errors = handleErrors(err);
      res.status(400).json({errors});
    }
});
//@ts-ignore
router.get('/signup',async (req, res) => {
    res.render('signup')
})
//@ts-ignore
router.get('/login',async (req, res) => {
    res.render('login');
})

//@ts-ignore
router.post('/login',async (req, res) => {
    const {email,password} = req.body;
    
    try {
        //@ts-ignore
        const user = await User.login(email, password)
        const token = createToken(user._id);
        res.cookie('jwt',token,{httpOnly:true,maxAge:maxAge*1000});
        res.status(200).json({ user:user._id });
    } catch (err) {
        //@ts-ignore
        const errors = handleErrors(err);
        res.status(400).json({errors});
    }
//handle errors
//@ts-ignore
const handleErrors = (err) => {
    console.log(err.message,err.code);
    let errors= {email:'',password:''};


    if(err.message =='Incorrect email'){
        errors.email = 'that email is not registered'
    }
    if(err.message =='Incorrect password'){
        errors.password = 'that password is not registered'
    }
//duplicate errors code
if(err.code ===11000) {
    errors.email='That email is already registered! '
    return errors;
}

//vaildation errors
if(err.message.includes('user validation failed')) {
    //@ts-ignore
    Object.values(err.errors).forEach(({ properties }) => {
        //@ts-ignore
            errors[properties.path] = properties.message;
        });
}
return errors;
}

});

module .exports = router;

