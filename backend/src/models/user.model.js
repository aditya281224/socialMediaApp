const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  userName:{
    type:String,
    unique:[true,"User name already exists"],
    required:[true,"User name is required"]
  },
  email:{
    type:String,
    unique:[true,"Email already exists"],
    required:[true,"Email is required"]
  },

  password:{
    type:String,
    required:[true,"User name is required"],
    select:false
  },

  bio:{
    type:String
  },

  profileImage:{
    type:String,
    default:"https://images.openai.com/static-rsc-4/9pCvVlCmtdA8SMAc_vJjbn0S35zVx3BkMMF0YH_7_FPoAHpVzGrEyEecwctcl4VMF4Zz2YhsvC1GdPHopDeQafWBceq1nxkSrYHkpdBDKWWEK-b8J7pE583_SY72-nWVgVtYDQ0H-kZlqekZsnG1HpD7g31_QW7jzGS8Ls4ZPLSEMXdNHgXe66ADl7l2oHFw?purpose=inline"
  }



})  


const userModel = mongoose.model("users",userSchema) 

module.exports=userModel;