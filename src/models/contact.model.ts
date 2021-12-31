import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

let contactSchema = new mongoose.Schema({
    tel:{type:String, required:true},
    email:{type:String, required:true},
    residence:{type:String, required:true},
    userId:
        {type : mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
     img: {
        type: String,
      },
},{ timestamps: true })
contactSchema.plugin(mongoosePaginate)
const Contact = mongoose.model('Contact',contactSchema)
export default Contact;