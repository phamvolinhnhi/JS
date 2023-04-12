const mongoose =require("mongoose");

const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique: true
    },
    password:{
        type:String,
        
    },
    confrimpassword:{
        type:String,
        
    },
    sdt:{
        type:String,
        
    },
    birthday:{
        type:String,
        required:true
    },
    users: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
      verified: Boolean
});

let User=mongoose.model("User",userSchema);
module.exports={User};