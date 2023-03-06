const mongoose = require ("mongoose")
const userschema= mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required:true
    },
    password:{
        type: String,
        required:true
    },
    isAdmin:{
        type: Boolean,
        default:false
  
    }
},
{
    timestamps:true
}
)


const UserModel= mongoose.model('users',userschema)
module.exports=UserModel
