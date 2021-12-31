import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

let messageSchema = new mongoose.Schema({
    date:{type:Date,required:true,default:new Date()},
    taille:{type:Number,required:true,default:1000},
    content:{type:String,required:true},
    userId:{
        type : mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    contactId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Contact',
        required:true
    }
},{ timestamps: true })
messageSchema.plugin(mongoosePaginate)
const Message = mongoose.model('Message',messageSchema)
export default Message;