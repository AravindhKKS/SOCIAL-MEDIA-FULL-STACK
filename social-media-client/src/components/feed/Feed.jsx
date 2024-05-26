import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
// import { Posts } from "../../dummyData";
import { useContext, useEffect, useState } from "react";
import axios from 'axios'
import { AuthContext } from "../../context/AuthContext";

export default function Feed({ username }) {
  const [post, setPost] = useState([])
  const BASE_URL = process.env.REACT_APP_BASE_URL
  const { user } = useContext(AuthContext)

  useEffect(() => {
    const FetchPost = async () => {
      const res = username ? await axios.get(BASE_URL + '/posts/profile/' + username) : await axios.get(BASE_URL + '/posts/timeline/' + user._id)
      setPost(res.data.sort((p1, p2) => {
        return new Date(p2.createdAt) - new Date(p1.createdAt)
      })
      )
    }
    FetchPost()
  }, [BASE_URL, username, user._id])

  return (
    <div className="feed">
      <div className="feedWrapper">
      { (!username || username === user.username) && <Share /> }
        {post.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
}
