import jwt from 'jsonwebtoken';
import User from '../models/user.model'


// @ts-ignore
const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        // @ts-ignore
        jwt.verify(token, 'krohn', async(err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.redirect('/login');
            } else {
                console.log('decode token' + decodedToken);
                let user = await User.findById(decodedToken);
                res.local.user = user;
                console.log(user)
                next();
            }
        })
    } else {
        res.redirect('/login')
    }
}

//check user permissions
// @ts-ignore
const checkUser = (req,res,next) => {
    const token = req.cookies.jwt;
    if(token) {
        //@ts-ignore
        jwt.verify(token,'krohn',async(err,decodedToken)=>{
            if(err) {
                console.log(err.message);
                res.locals.user = null;
                next();
            } else {
                console.log(decodedToken);
                let user = await User.findById(decodedToken.id);
                res.locals.user = user;
                next();
            }
        })
    } else{
        res.locals.user = null;
        next();
    }
}

module.exports = {requireAuth,checkUser};
