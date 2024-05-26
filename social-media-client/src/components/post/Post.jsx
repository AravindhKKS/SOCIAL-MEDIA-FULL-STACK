import "./post.css";
import { MoreVert } from "@material-ui/icons";
// import { Users } from "../../dummyData";
import { useContext, useEffect, useState } from "react";
import ReactTimeAgo from 'react-time-ago'
import {Link} from 'react-router-dom'
import axios from 'axios';
import { AuthContext } from "../../context/AuthContext";

export default function Post({ post }) {
  const [like,setLike] = useState(post.likes.length)
  const [isLiked,setIsLiked] = useState(false)
  const [user, setUser] = useState({})
  const PF = process.env.REACT_APP_PUBLIC_FOLDER
  const BASE_URL = process.env.REACT_APP_BASE_URL
  const {user:currentUser} = useContext(AuthContext)

  // Convert post.createdAt to a timestamp
  const createdAtTimestamp = new Date(post.createdAt).getTime();


  // console.log(currentUser._id)
useEffect(() => {
setIsLiked(post.likes.includes(currentUser._id))
},[currentUser._id,post.likes])



  const likeHandler = async ()=>{
    try{
      await axios.put(BASE_URL + '/posts/' +post._id +'/like', {userId: currentUser._id})
    }catch(err){
      console.log(err + 'fix the error')
    }
    setLike(isLiked ? like-1 : like+1)
    setIsLiked(!isLiked)
  }

useEffect(() => {
  const fetchUser = async () => {
    try{
      const res = await axios.get(BASE_URL +`/users?userId=${post.userId}`)
      setUser(res.data)
    }catch(err){
      console.log(err + ' fix the error')
    }
  }
  fetchUser()
},[BASE_URL,post])

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`profile/${user.username}`}>
            <img
              className="postProfileImg"
              src={user.profilePicture ? PF + user.profilePicture : PF + 'noavatar.jpg'}
              alt=""
              />
              </Link>
            <span className="postUsername">
              {user.username}
            </span>
            <span className="postDate">
            <ReactTimeAgo date={createdAtTimestamp} locale="en-US"/>
            </span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          {post.img && <img className="postImg" src={PF + post.img} alt="" />}
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img className="likeIcon" src="/assets/like.png" onClick={likeHandler} alt="" />
            <img className="likeIcon" src="/assets/heart.png" onClick={likeHandler} alt="" />
            <span className="postLikeCounter">{like} people like it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}
