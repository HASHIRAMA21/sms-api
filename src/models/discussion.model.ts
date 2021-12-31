import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

let discussionSchema = new mongoose.Schema({
    UserID:[
        {type : mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
    ],
    ContactID:[
        {type : mongoose.Schema.Types.ObjectId,
            ref:'Contact'
        }
    ],
    tel:{
        type:String,
        required:true,
        unique:true
    },
    dateDiscussin:{
        type:Date,required:true,default:new Date()
    }
})
discussionSchema.plugin(mongoosePaginate);
const Discussion = mongoose.model('Discussion',discussionSchema);
export default Discussion;