const mongoose =require("mongoose");

const UserVerificationSchema=new mongoose.Schema({
    userId: String,
    uniqueString: String,
    createAt: Date,
    expiresAt: Date,
   
});

let UserVerification =mongoose.model("UserVerification",UserVerificationSchema);
module.exports={UserVerification};