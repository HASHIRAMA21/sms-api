import Contact from "../models/contact.model";
const router = require('express').Router();


//@ts-ignore
router.get('/', async(req, res) => {
    Contact.find((err, contact) => {
        if(err) res.status(500).send(err);
        else res.status(200).send(contact);
    })  
  })
// @ts-ignore
router.get("/pcontact",(req,res) => {
    // @ts-ignore
    let p = parseInt(String(req.query.page || 1));
    // @ts-ignore
    let size = parseInt((req.query.size || 5));
    let kw = req.query.kw || "";
    Contact.paginate({title:{$regex:".*(?i)"+kw+".*"}},{page:p,limit:size},(err,contact) =>{
        if(err) res.status(500).send(err);
        else res.send(contact);
    });
});
// @ts-ignore
router.put("/contact/:id",(req,res) =>{
    // @ts-ignore
    Contact.findByIdAndUpdate(req.params.id,(err, book) =>{
        if(err) res.status(500).send(err);
        else res.send("Contact sucessfully updated");
    })
} );
//add the book to the database
//@ts-ignore
router.post("/contact",(req,res) =>{
    let contact = new Contact(req.body);
    contact.save(err=>{
        if(err) res.status(500).send(err);
        else res.send(contact);
    })
} );
//@ts-ignore
router.delete('/contact/:id',async(req,res)=>{
    try{
        const contact = await Contact.findById(req.params.id);
        //@ts-ignore
        if(contact.userId === req.body.userId) {
            await contact?.deleteOne();
            res.status(200).json('The contact  has been deleted successfully');
        } else{
            res.status(403).json('You cand delete only your contact')
        }
    }catch(err) {
        res.status(500).json(err);
    }
});



module.exports =router