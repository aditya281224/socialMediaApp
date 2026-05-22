const followModel = require("../models/follow.model")




async function followUserController(req,res){
  const followerUsername=req.user.username
  const followeeUsername=req.params.username
  
  const isAlreadyFollowing = await followModel.findOne({
    follower:followerUsername,
    followee:followeeUsername,
    status:"accepted"
  })

  if(isAlreadyFollowing){
    return res.status(200).json({
      message:`You are already following the ${followeeUsername}`,
      follow:isAlreadyFollowing
    })
  }

  const followRecord = await followModel.create({
    follower:followerUsername,
    followee:followeeUsername,
    status:"pending"
  })


  res.status(201).json({
    message:`You have requested to  follow ${followeeUsername}`,
    follow:followRecord
  })
}


async function unfollowUserController(req,res){
  const followerUsername=req.user.username
  const followeeUsername=req.params.username
  
  const isUserFollowing = await followModel.findOne({
    follower:followerUsername,
    followee:followeeUsername,
    status:"accepted"
  })

  if(!isUserFollowing){
    return res.status(200).json({
      message:`You are not following the ${followeeUsername}`,
      follow:isUserFollowing
    })
  }

await followModel.findByIdAndDelete(isUserFollowing._id)


  res.status(201).json({
    message:`You have unfollowed ${followeeUsername}`,
  })
}

async function updateFollowRequestController(req,res){

  const followeeUsername = req.user.username
  const followerUsername = req.params.username

  const {status} = req.body

  const request = await followModel.findOne({
    follower: followerUsername,
    followee: followeeUsername,
    status: "pending"
  })

    if (!request) {
    return res.status(404).json({
      message: "Follow request not found"
    });
  }


  if(status === "accepted"){
    request.status=status
      await request.save()

    res.status(201).json({
      message:`You have accepted the request of ${followerUsername}`,
      data:request 
    })
  }

  if(status==="rejected"){
    request.status=status
      await request.save()

    res.status(201).json({
      message:`You have rejected the request of ${followerUsername}`,
      data:request
    })
  }


}

module.exports={
  followUserController,
  unfollowUserController,
  updateFollowRequestController
}