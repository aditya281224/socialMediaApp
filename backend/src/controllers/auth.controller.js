const userModel = require("../models/user.model");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs")


async function registerController (req, res)  {
  const { email, userName, password, bio, profileImage } = req.body;

  const isUserAlreadyExists = await userModel.findOne({
    $or: [{ userName }, { email }],
  })

  if (isUserAlreadyExists) {
    return res.status(409).json({
      message:
        isUserAlreadyExists.email === email
          ? "Email already exists"
          : "Username already exists",
    });
  }

  const hash =await bcrypt.hash(password,10)
  const user = await userModel.create({
    email,
    userName,
    password: hash,
    bio,
    profileImage,
  });

  const token = jwt.sign(
    {
      id: user._id,
      username:user.userName
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    },
  );

  res.cookie("token", token);
  return res.status(201).json({
    message: "User created successfully",
    user: {
      email: user.email,
      userName: user.userName,
      bio: user.bio,
      profileImage: user.profileImage,
    },
  });
}


async function loginController(req, res)  {
  const { email, password, userName } = req.body;
  
  const userExists = await userModel.findOne({
    $or: [{ email }, {userName}],
  }).select("+password");

  if (!userExists) {
    return res.status(404).json({
      message: "User does not exist",
    });
  }

 const isPasswordValid = await bcrypt.compare(password,userExists.password)

 if(!isPasswordValid){
  return res.status(401).json({
    message:"Password is invalid"
  })
 }

  const token = jwt.sign(
    {
      id: userExists._id,
      username:userExists.userName

    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    },
  );

  res.cookie("token", token);
  return res.status(200).json({
    message: "Logged in",
    user: {
      email: userExists.email,
      userName: userExists.userName,
      bio: userExists.bio,
      profileImage: userExists.profileImage,
    },
  });
}

async function getMeController(req,res){
  const userId=req.user.id
  const user = await userModel.findById(userId);

  if(!user){
    res.status(400).json({
      message:"User not found"
    }
    )
  }

  return res.status(200).json({
    message:"User found",
    user:{
      userName:user.userName,
      email:user.email,
      bio:user.bio,
      profileImage:user.profileImage
    }
  })
}


module.exports={
  registerController,
  loginController,
  getMeController
}