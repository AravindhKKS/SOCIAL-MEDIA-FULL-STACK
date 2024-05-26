import "./rightbar.css";
import { Users } from "../../dummyData";
import Online from "../online/Online";
import { useContext, useEffect, useState } from "react";
import {Link} from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from "../../context/AuthContext";
import { Add, Remove } from "@material-ui/icons";

export default function Rightbar({ user}) {
  const [friends,setFriends] =  useState([])
  const PF = process.env.REACT_APP_PUBLIC_FOLDER
  const BASE_URL = process.env.REACT_APP_BASE_URL
  const {user:currentUser,dispatch} = useContext(AuthContext)
  const [isFollowed, setIsFollowed] = useState(currentUser.followings.includes(user?._id))

useEffect(() => {
const FetchFriends = async () => {
 try{
  const res = await axios.get(`${BASE_URL}/users/friends/`+ user._id )
  setFriends(res.data)
 }catch(err){
  console.log(err)
 }
}
FetchFriends()
},[BASE_URL,user])

const handleClick =async () => {
  try{
if(isFollowed){
  await axios.put(`${BASE_URL}/users/${user._id}/unfollow`,{userId:currentUser._id})
  dispatch({type:"UNFOLLOW", payload:user._id})
}else{
  await axios.put(`${BASE_URL}/users/${user._id}/follow`,{userId:currentUser._id})
  dispatch({type:"FOLLOW", payload:user._id})
}
  }catch (err){
console.log(err)
  }
  setIsFollowed(!isFollowed)
}

  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img className="birthdayImg" src={`${PF}/gift.png`} alt="" />
          <span className="birthdayText">
            <b>Pola Foster</b> and <b>3 other friends</b> have a birhday today.
          </span>
        </div>
        <img className="rightbarAd" src={`${PF}/ad.png`} alt="" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {Users.map((u) => (
            <Online key={u.id} user={u} />
          ))}
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
      {user.username !== currentUser.username && (
      <button className="rightbarFollowButton" onClick={handleClick}>
        {isFollowed ? "UNFOLLOW" : "FOLLOW"}
        {isFollowed ? <Remove/> : <Add/> }
       
        </button>)}
        <h4 className="rightbarTitle">User information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{user.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{user.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">{user.relationship === 1 ? "Single" : user.relationship >= 2 ? "Married" : '-'  }</span>
          </div>
        </div>
        <h4 className="rightbarTitle">User friends</h4>
        <div className="rightbarFollowings">
          {friends.map((friend) => (
        <Link to={`/profile/${friend.username}`} style={{textDecoration:'none'}}>
            <div className="rightbarFollowing" key={user.username} > 
            <img
              src={ friend.profilePicture ? PF + friend.profilePicture : `${PF}/noavatar.jpg`}
              alt=""
              className="rightbarFollowingImg"
              />
            <span className="rightbarFollowingName">{friend.username}</span>
          </div>
          </Link>
          ))}
        </div>
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}
