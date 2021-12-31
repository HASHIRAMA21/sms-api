import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';
const bcrypt = require('bcrypt');

let userSchema = new mongoose.Schema({
    first_name:{type:String, required:true},
    second_name:{type:String, required:true},
    age:{type:Number, required:true},
    username:{type:String, required:true},
    email:{type:String, required:true},
    password:{type:String, required:true},
    phone:{type:String, required:true},
    img: {
        type: String,
      },
},{ timestamps: true })
//play function before  save into dispalay :'Block
userSchema.pre("save", async function(next) {
    const salt = await bcrypt.gentSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});
userSchema.statics.login = async function(email,password) {
    const user = await this.findOne({email});
    if(user) {
        const auth = await bcrypt.compare(password,user.password);
        if(auth) {
            return user;
        }
        throw Error('incorrect password');
    }
    throw Error('incorrect email');
}
userSchema.plugin(mongoosePaginate);
const User = mongoose.model('User',userSchema);
export default User;

