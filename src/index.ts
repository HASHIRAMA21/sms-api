import express,{ Express } from "express";
import mongoose,{ Mongoose } from "mongoose";
import bodyParser from "body-parser";


const app = express();
const cookieParser = require("cookie-parser");
const { checkUser,requireAuth } = require('./midleware/auth.midleware');
const userRoutes = require('./routes/user.routes');
const authRoutes = require('./routes/auth.routes');
const msgRoutes = require('./routes/message.routes');
const conRoutes = require('./routes/contact.routes');

//bd connection
const uri = 'mongodb://localhost:27017/pweb'
mongoose.connect(uri,(err)=>{
    if(err) console.log(err);
    else console.log('Data base connnection successfuly')
})

//midleware
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cookieParser);

//set routes
app.get('*',checkUser);
app.use('/apiuser',userRoutes);
app.use('/api/auth',authRoutes);
app.use('/apimsg',msgRoutes),
app.use('/apicontact',conRoutes)

app.get('/',(req,res)=>{
    res.send('Server listening on port !!!')
})

//listenning port of the server
app.listen(9000,()=>{
    console.log('Server listenning on port',9000)
})

