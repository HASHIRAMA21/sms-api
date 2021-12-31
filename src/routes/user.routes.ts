import User from "../models/user.model";
const router = require('express').Router();
const bcrypt = require('bcrypt');

//get User
// @ts-ignore
router.get('',(req,res)=>{
    User.find((err,user)=>{
        if(err) res.status(500).send(err);
        else res.send(user);
    })
})
//search user by id
//search by id
router.get("/user/:id",(req:Request,res:Response) =>{
    // @ts-ignore
    User.findById(req.params.id,(user,err) =>{
        // @ts-ignore
        if(err) res.status(500).send(err)
        // @ts-ignore
        else res.send(user);
    })
});
//searching thhe book by the title
// @ts-ignore
router.get("/puser",(req,res) => {
    // @ts-ignore
    let p = parseInt(String(req.query.page || 1));
    // @ts-ignore
    let size = parseInt((req.query.size || 5));
    let kw = req.query.kw || "";
    User.paginate({title:{$regex:".*(?i)"+kw+".*"}},{page:p,limit:size},(err,user) =>{
        if(err) res.status(500).send(err);
        else res.send(user);
    });
});
//add the book to the database
// @ts-ignore
router.post("/user",(req,res) =>{
    let user = new User(req.body);
    user.save(err=>{
        if(err) res.status(500).json(err);
        else res.send(user);
    })
} );
//update user
//
// @ts-ignore
router.put('/user/:id',async (req,res)=>{
    if(req.body.userId === req.params.id) {
        if (req.body.password) {
            try {
                const salt = await bcrypt.gentSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            } catch (err) {
                return res.status(500).json(err);
            }
        }
        try {
            const user = await User.findByIdAndUpdate(req.params.id, {
                $req: req.body,
            });
            req.status(200).json('Updated Successfuly')
        } catch (err) {
            return res.status(500).json(err);
        }
    }else {
        return res.status(403).json('You can update only account');

    }
});

//delete user
// @ts-ignore
router.delete("/user/:id", async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        try {
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json("Account has been deleted");
        } catch (err) {
            return res.status(500).json(err);
        }
    } else {
        return res.status(403).json("You can delete only your account!");
    }
});
module .exports = router;