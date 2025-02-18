const router = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')


//update the user
router.put('/:id',async (req,res) => {
if(req.body.userId === req.params.id){
  if(req.body.password){
try{
  const slat = await bcrypt.genSalt(10)
  req.body.password = await bcrypt.hash(req.body.password,slat)
}catch(err){
  return res.status(500).json(err)
}
  }
  try{
    const updatedUser = await User.findByIdAndUpdate(req.params.id,{
    $set:req.body
  },{new:true})
  
  const {password, ...others} = updatedUser._doc
        res.status(200).json(others)
      }catch(err){
          res.status(500).json(err)
      }

}else{
  res.status(500).json('You can only Update Your Account')
}
})



//get the User
router.get('/', async (req,res) => {
  const userId = req.query.userId
  const username = req.query.username
  try{
    const findUser = userId ?  await User.findById(userId): await User.findOne({username:username})
    const {password,...others} = findUser._doc
    res.status(200).json(others)
  }catch(err){
   return res.status(500).json(err)
  }
})

//following the User
router.put('/:id/follow', async (req,res) => {
if(req.body.userId !== req.params.id){
try{
const user = await User.findById(req.params.id)
const currentUser = await User.findById(req.body.userId)
if(!user.followers.includes(req.body.userId)){
  await user.updateOne({$push:{followers:req.body.userId}})
  await currentUser.updateOne({$push:{followings:req.params.id}})
  res.status(200).json('Your follow the user..!')
}else{
  res.status(403).json('Your already following the User...!')
}

}catch(err){
  return res.status(500).json(err)
}
}else{
  res.status(403).json("You can't following YourSelf")
}

})

//unfollowing the user

router.put('/:id/unfollow', async (req,res) => {
  if(req.body.userId !== req.params.id){
const user = await User.findById(req.params.id)
const currentUser = await User.findById(req.body.userId)
if(user.followers.includes(req.body.userId)){
await user.updateOne({$pull : {followers:req.body.userId}})
await currentUser.updateOne({$pull:{followings:req.params.id}})
res.status(200).json('user has been unfollowed...!')
}else{
  res.status(403).json('Your not following the User so you can\'t unfollow the user...! ')
}
  }else{
    res.status(401).json("same user can't do this")
  }
})

// GET FRIENDS  

router.get('/friends/:userId', async (req,res) => {
  try{
    const user = await User.findById(req.params.userId)
    const friends = await Promise.all(
      user.followings.map((friendId) => {
        return User.findById(friendId)
      })
    )
    let friendList = [];
    friends.map((friend) => {
    const {_id,username,profilePicture} = friend;
    friendList.push({_id,username,profilePicture})
    })
res.status(200).json(friendList)
  }catch(err){
    res.status(500).json(err)
  }
})


//delete the User
router.delete('/:id', async (req,res) => {
  if(req.body.userId === req.params.id){
   try{
     await User.findByIdAndDelete(req.params.id),
     res.status(200).json("Your Account Was Deleted...!")
  }catch(err){
    res.status(500).json(err)
  }
  }else{
   res.status(500).json('You Can Only Delete Your Account ')
 }
 })

 
module.exports =router