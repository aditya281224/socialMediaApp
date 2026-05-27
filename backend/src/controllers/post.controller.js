const postModel = require("../models/post.model");
const likeModel = require("../models/like.model")
const ImageKit = require("@imagekit/nodejs");

const { toFile } = require("@imagekit/nodejs");

const imagekit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

async function createPostController(req, res) {
  const files = await imagekit.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), "file"),
    fileName: "Test",
    folder: "vincular",
  });

  const post = await postModel.create({
    caption: req.body.caption,
    imgUrl: files.url,
    user: req.user.id,
  });

  res.status(201).json({
    message: "post created successfully",
    post,
  });
}

async function getUserPosts(req, res) {
  const userId = req.user.id;
  const data = await postModel.find({
    user: userId,
  });

  return res.status(200).json({
    message: "All user data",
    data,
  });
}

async function getPostDetails(req, res) {
  const userId = req.user.id;
  const postId = req.params.postId;

  const post = await postModel.findById(postId);

  if (!post) {
    return res.status(404).json({
      message: "Posts not found",
    });
  }

  const isValidUser = post.user.toString() === userId;
  if (!isValidUser) {
    return res.status(403).json({
      message: "Forbidden content",
    });
  }

  return res.status(200).json({
    message: "Post fetched successfully",
  });
}


async function likePostController(req,res){
  const username = req.user.username
  const postId=req.params.postId


  const post = await postModel.findById(postId)

  if(!post){
    return res.status(404).json({
      message:"post not found."
    })
  }

  const like = await likeModel.create({
    post:postId,
    user:username
  })

  res.status(200).json({
    message:"Liked",
    likePost:like
  })
}

async function getFeedController(req,res){
  const posts = await postModel.find().populate("user").select("-user.password");

  res.status(200).json({
    message:"Posts fetched successfully",
    posts
  })
}

module.exports = {
  createPostController,
  getUserPosts,
  getPostDetails,
  likePostController,
  getFeedController
};
