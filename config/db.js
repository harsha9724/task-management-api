const mongoose = require("mongoose")


function connectToDb(url){
    try{
        mongoose.connect(url);
        console.log("✅ connect to DB");
        
    }catch(err){
        console.log("❌ error in connecting to DB",err.message);
        
    }
}

module.exports = {connectToDb}