import Message from "../models/message.model";
const router = require('express').Router();
import Users from "../models/user.model";


//get et message
//@ts-ignore
router.get('/', async(req, res) => {
  Message.find((err, message) => {
      if(err) res.status(500).send(err);
      else res.status(200).send(message);
  })  
})
//search by keyway
// @ts-ignore
router.get("/message",(req,res) => {
    // @ts-ignore
    let p = parseInt(String(req.query.page || 1));
    // @ts-ignore
    let size = parseInt((req.query.size || 5));
    let kw = req.query.kw || "";
    Message.paginate({title:{$regex:".*(?i)"+kw+".*"}},{page:p,limit:size},(err,message) =>{
        if(err) res.status(500).send(err);
        else res.send(message);
    });
});


//@ts-ignore
router.post('/message/:id',async(req,res) =>{
    const newMessage = new Message(req.body);
    try { 
        const savedMessage = await newMessage.save();
        res.status(200).json(savedMessage);
    }catch(err) {
        res.status(500).json(err);
    }
})

//delete et message
//@ts-ignore
router.delete('/:id',async(req,res)=>{
    try{
        const message = await Message.findById(req.params.id);
        //@ts-ignore
        if(message.userId === req.body.userId) {
            await message?.deleteOne();
            res.status(200).json('The message  has been deleted successfully');
        } else{
            res.status(403).json('You cand delete only your post')
        }
    }catch(err) {
        res.status(500).json(err);
    }
});
//@ts-ignore
router.get("/contact/:userId", async (req, res) => {
    try {
      const currentUser = await Users.findById(req.params.userId);
      //@ts-ignore
      const userMessage= await Message.find({ userId: currentUser._id });
      const contactMessage = await Promise.all(
          //@ts-ignore
        currentUser.followings.map((contactId) => {
          return Message.find({ userId: contactId });
        })
      );
      res.status(200).json(userMessage.concat(...contactMessage));
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
//get all message  for user
//@ts-ignore
router.get('/user/username',async(req, res) => {
    try {
        const user = await Users.findOne({usernames:req.params.username});
        const message = await Message.find({message:req._id})
        res.status(200).json(message);
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports =router