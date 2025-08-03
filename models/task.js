const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    completed:{
        type:Boolean,
        default:false
    },
    user_id:{
        type:mongoose.Types.ObjectId,
        ref:"User"
    }
},{timestamps:true});


const taskModel  = mongoose.model("Task",taskSchema);

module.exports = taskModel;