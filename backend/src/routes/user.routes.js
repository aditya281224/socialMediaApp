const express = require("express")
const userRouter = express.Router();
const userController  = require("../controllers/user.controller")
const identityUser = require("../middlewares/auth.middleware")


userRouter.post("/follow/:username",identityUser,userController.followUserController)

userRouter.post("/unfollow/:username",identityUser,userController.unfollowUserController)

userRouter.patch("/update/:username",identityUser,userController.updateFollowRequestController)

module.exports = userRouter;