const mongoose= require ("mongoose")
const roomschema=mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    facilities:[],
    maxcount:{
        type:Number,
        required:true
    },
    rentperday:{
        type:Number,
        required:true
    },
    imageurls:[],
    currentBookings:[],
    type:{
        type:String,
        required:true
    }
    
},{timestamps:true})
const roomModel = mongoose.model('rooms',roomschema)
module.exports=roomModel